import * as React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";

import Layout from "@/components/layout/Layout";
import Table from "@/components/table/Table";
import ConfirmModal from "@/components/modal-confirm/ModalConfirm";
import { IRootState } from "@/store/interfaces";
import ClientItem from "./client-item/ClientItem";
import ClientDetail from "./client-detail/ClientDetail";
import AddClientModal from "./modals/AddClientModal";
import ClientNav from "./clients-nav/ClientNav";
import EditClientModal from "./modals/EditClientModal";
import { removeClient } from "@/store/clients/actions";
import { isAllowFilter } from "@/utils/base";
import EmptySearch from "@/components/views/ContentEmptySearch";

const mapStateToProps = (state: IRootState) => {
  const term = state.client.search;
  let clientIds = state.client.clientsIds;
  clientIds =
    (term
      ? clientIds.filter((id) => {
          const client = state.client.clientsList[id];
          return isAllowFilter(client, term);
        })
      : clientIds) || [];
  return {
    clientIds,
    clientsList: state.client.clientsList,
    term: state.client.search,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeClient: (id: string) => dispatch(removeClient(id)),
  };
};

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof storeEnhancer>;

type AppProps = {} & PropsFromRedux & WithTranslation;

interface IState {
  isClientCardOpen: boolean;
  clientCardId: string;
  isAddClientModalOpen: boolean;
  isClientDeleteModalOpen: boolean;
  clientDeletelId: string;
  isEditClientModalOpen: boolean;
  clientEditId: string;
}

class Clients extends React.Component<AppProps> {
  readonly state: IState = {
    isAddClientModalOpen: false,
    isClientCardOpen: false,
    isClientDeleteModalOpen: false,
    isEditClientModalOpen: false,
    clientCardId: "",
    clientDeletelId: "",
    clientEditId: "",
  };

  /**
   * Изменяет url и показывает/скрывает модалку карточки
   */

  handleToggleClientCard = (id?: string) => {
    // const url = id ? `/${this.props.spaceId}/clients/${id}` : `/${this.props.spaceId}/clients`;

    // this.props.history.push(url);
    this.setState({
      isClientCardOpen: !!id,
      clientCardId: id || this.state.clientCardId,
    });
  };

  closeClientDetail = () => {
    this.setState({
      isClientCardOpen: false,
    });
  };

  renderTableHeader = (style: React.CSSProperties) => {
    return (
      <div className="table__header" style={style}>
        <div className="table__header-cell table__header-cell_name">
          {this.props.t("clients.table.name")}
        </div>
        <div className="table__header-cell table__header-cell_company">
          {this.props.t("clients.table.company")}
        </div>
        <div className="table__header-cell table__header-cell_phone">
          {this.props.t("clients.table.phone")}
        </div>
        <div className="hide-lg table__header-cell table__header-cell_mail">
          {this.props.t("clients.table.mail")}
        </div>
        <div className="hide-md table__header-cell table__header-cell_context-menu"></div>
      </div>
    );
  };

  getItemSize = (deviceWidth: number, index: number) => {
    if (deviceWidth > 768) {
      if (index === 0) return 76;
      return 57;
    }

    if (index === 0) return 30;
    return 65;
  };

  handleToggleClientDeleteModal = (
    clientDeletelId: string,
    fromRow?: boolean
  ) => {
    if (clientDeletelId) {
      this.setState({
        clientDeletelId,
        isClientDeleteModalOpen: true,
      });
    } else {
      this.setState({ isClientDeleteModalOpen: false });
      this.handleToggleClientCard(clientDeletelId);
    }
  };

  handleToggleEditModal = (id?: string, fromRow?: boolean) => {
    this.setState({
      isEditClientModalOpen: !!id,
      clientEditId: id,
    });
  };

  renderTableRow = (style: React.CSSProperties, id: string) => {
    return (
      <ClientItem
        style={style}
        //@ts-ignore
        clientId={id}
        term={this.props.term}
        client={this.props.clientsList[id]}
        clientActiveId={this.state.clientCardId}
        clientCardOpen={this.handleToggleClientCard}
        handleDeleteClient={this.handleToggleClientDeleteModal}
        handleOpenEditModal={this.handleToggleEditModal}
      />
    );
  };

  handleCloseAddClientModal = () => {
    this.setState({
      isAddClientModalOpen: false,
    });
  };

  handleShowAddClientModal = () => {
    this.setState({
      isAddClientModalOpen: true,
    });
  };

  handleCancelClientDeleteModal = () => {
    this.setState({ isClientDeleteModalOpen: false });
  };
  handleConfirmClientDeleteModal = () => {
    this.handleToggleClientDeleteModal("");
    this.props.removeClient(this.state.clientDeletelId);
  };

  renderClientsList = () => {
    if (this.props.clientIds.length === 0) {
      return (
        <EmptySearch
          title={this.props.t("clients.empty_search.title")}
          text={this.props.t("clients.empty_search.text")}
        />
      );
    }

    return (
      <Table
        data={[...this.props.clientIds]}
        renderHeader={this.renderTableHeader}
        renderRow={this.renderTableRow}
        getItemSize={this.getItemSize}
      />
    );
  };

  render() {
    return (
      <Layout
        title={this.props.t("clients.title")}
        nav={<ClientNav handleClick={this.handleShowAddClientModal} />}
      >
        <>
          {this.renderClientsList()}

          <ClientDetail
            isOpen={this.state.isClientCardOpen}
            handleCloseDetail={this.closeClientDetail}
            clientId={this.state.clientCardId}
            handleOpenEditModal={this.handleToggleEditModal}
            handleDeleteClient={this.handleToggleClientDeleteModal}
          />
          <AddClientModal
            isOpen={this.state.isAddClientModalOpen}
            handleCloseModal={this.handleCloseAddClientModal}
          />

          <EditClientModal
            isOpen={this.state.isEditClientModalOpen}
            editClientId={this.state.clientEditId}
            handleCloseModal={this.handleToggleEditModal.bind(this, undefined)}
          />

          <ConfirmModal
            customClass="small-indent"
            isOpen={this.state.isClientDeleteModalOpen}
            handleCloseModal={this.handleCancelClientDeleteModal}
            handleConfirm={this.handleConfirmClientDeleteModal}
          >
            <div className="modal-confirm__title">
              {this.props.t("clients.client_remove_text")}
            </div>
            <div className="modal-confirm__text">
              {this.props.t("clients.client_remove_desc")}
            </div>
          </ConfirmModal>
        </>
      </Layout>
    );
  }
}

export default withTranslation()(storeEnhancer(Clients));
