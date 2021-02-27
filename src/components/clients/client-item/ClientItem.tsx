import * as React from "react";
import { useTranslation } from "react-i18next";

import ContextMenu from "@/components/context-menu/ContextMenu";
import ClientMetaItem from "../client-meta/ClientMetaItem";
import { getClientFullName, getSearchMatch } from "@/utils/base";
import { CLIENT_PHONE, CLIENT_EMAIL } from "@/utils/constants";

interface IClientProps {
  style: React.CSSProperties;
  client: any;
  clientCardOpen: (id: string) => void;
  clientActiveId: string;
  clientId: string;
  term: string;
  handleDeleteClient: (id: string) => void;
  handleOpenEditModal: (id: string) => void;
}

const Client: React.FC<IClientProps> = ({
  style,
  client,
  term,
  clientCardOpen,
  clientActiveId,
  clientId,
  handleDeleteClient,
  handleOpenEditModal,
}) => {
  const { t } = useTranslation();

  const getActions = () => {
    let actions = [
      {
        label: t("btn.edit"),
        action: "edit",
        icon: "wd-ico-rename",
      },
    ];

    actions.push({
      label: t("btn.remove"),
      action: "remove",
      icon: "wd-ico-del",
    });
    return actions;
  };

  const handleOpenClient = () => {
    clientCardOpen(client.id);
  };

  const handleContextMenu = (action: string) => {
    if (action === "remove") handleDeleteClient(clientId);
    if (action === "edit") handleOpenEditModal(clientId);
  };

  const clientRender = () => {
    return (
      <div
        className={`table__row-wrap  ${
          clientId === clientActiveId ? "active" : ""
        }`}
        style={style}
      >
        <div className="client__profile table__row" onClick={handleOpenClient}>
          <div className="table__cell table__cell_name">
            <div className="client__main-info client__flex-start">
              {term ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: getSearchMatch(getClientFullName(client), term),
                  }}
                />
              ) : (
                getClientFullName(client)
              )}
            </div>
          </div>

          <div className="table__cell hide-sm table__cell_company">
            {client.company_name && (
              <div className="client__company">{client.company_name}</div>
            )}
          </div>

          <div className="table__cell hide-sm table__cell_phone">
            <ClientMetaItem
              tableViewMode
              term={term}
              client={client}
              metaItemName={CLIENT_PHONE}
            />
          </div>

          <div className="table__cell hide-lg table__cell_mail">
            <ClientMetaItem
              tableViewMode
              term={term}
              client={client}
              metaItemName={CLIENT_EMAIL}
            />
          </div>

          <div className="table__cell hide-md table__cell_context-menu">
            <ContextMenu actions={getActions()} onClick={handleContextMenu} />
          </div>
        </div>
      </div>
    );
  };

  return clientRender();
};

export default Client;
