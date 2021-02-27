import * as React from "react";
import { CSSTransition } from "react-transition-group";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";

import {
  CLIENT_EMAIL,
  CLIENT_NOTE,
  CLIENT_PHONE,
} from "@/utils/constants";
import { getClientFullName } from "@/utils/base";
import { IRootState } from "@/store/interfaces";
import ClientMetaItem from "../client-meta/ClientMetaItem";
import ContextMenu from "@/components/context-menu/ContextMenu";
import {
  MailIcon,
  PhoneIcon,
  NoteIcon,
  CloseIcon,
} from "@/components/icons";

import "./index.scss";

interface IParentProps {
  isOpen: boolean;
  handleCloseDetail: () => void;
  clientId: string;
  handleOpenEditModal: (id: string) => void;
  handleDeleteClient: (id: string) => void;
}



const mapStateToProps = (state: IRootState, { clientId }: IParentProps) => {
  const client = state.client.clientsList[clientId];

  return {
    client,
  };
};

const storeEnhancer = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof storeEnhancer>;
type AppProps = {} & PropsFromRedux & IParentProps & WithTranslation;

class ClientDetail extends React.Component<AppProps> {
  get getActions() {
    let actions = [
      {
        label: this.props.t("btn.edit"),
        action: "edit",
      },
      {
        label: this.props.t("btn.remove"),
        action: "remove",
      },
    ];

    return actions;
  }
  handleContextMenu = (action: string) => {
    if (action === "edit") this.props.handleOpenEditModal(this.props.clientId);
    if (action === "remove") this.props.handleDeleteClient(this.props.clientId);
  };

  render() {
    const { client } = this.props;

    return (
      <CSSTransition
        in={this.props.isOpen}
        timeout={450}
        classNames="client-detail-box"
        unmountOnExit
      >
        {client ? (
          <div className="client-detail">
            <div className="client-detail__container">
              <div className="client-detail__controls">
                <ContextMenu
                  actions={this.getActions}
                  onClick={this.handleContextMenu}
                />

                <CloseIcon
                  className="client-detail__close"
                  onClick={this.props.handleCloseDetail}
                />
              </div>
              <div className="client-detail__info">
                <div className="client-detail__main-info">
                  <div className="client-detail__name">
                    {getClientFullName(client)}
                  </div>
                  {client.company_name && (
                    <div className="client-detail__company">
                      {client.company_name}
                    </div>
                  )}
                </div>

                <div className="client-detail__other-data">
                  <div className="client__meta">
                    <div className="client__contacts">
                      <ClientMetaItem
                        client={client}
                        metaItemName={CLIENT_PHONE}
                        metaItemIcon={PhoneIcon}
                      />
                      <ClientMetaItem
                        client={client}
                        metaItemName={CLIENT_EMAIL}
                        metaItemIcon={MailIcon}
                      />
                      <ClientMetaItem
                        client={client}
                        metaItemName={CLIENT_NOTE}
                        metaItemIcon={NoteIcon}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </CSSTransition>
    );
  }
}

export default withTranslation()(storeEnhancer(ClientDetail));
