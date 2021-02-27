import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";

import Modal from "@/components/modal/Modal";
import ClientForm from "../forms/ClientForm";
import { IRootState } from "@/store/interfaces";
import { editClient } from "@/store/clients/actions";
interface IModalProps {
  isOpen: boolean;
  editClientId: string;
  handleCloseModal: () => void;
}




const mapStateToProps = (state: IRootState, { editClientId }: IModalProps) => {
  return { client: state.client.clientsList[editClientId] };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    editClient: (client: any) => dispatch(editClient(client)),
  };
};

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof storeEnhancer>;

type AppProps = {} & IModalProps & PropsFromRedux & WithTranslation;

class EditClientModal extends React.Component<AppProps> {
  private FormRef = React.createRef<any>();
  get getInitialValuesData() {
    const client = this.props.client;
    const {
      first_name = "",
      last_name = "",
      middle_name = "",
      company_name = "",
      note = "",
      meta = {},
    } = client || {};

    return {
      first_name,
      last_name,
      middle_name,
      company_name,
      note,
      meta,
    };
  }

  handleSubmit = (data: any) => {
    const client = this.props.client;
    data.id = client.id;
    this.props.editClient(data);
    this.props.handleCloseModal();

  };

  handleSaveAccept = () => {
    if (this.FormRef && this.FormRef.current) this.FormRef.current.click();
}

  renderEditClientContent = () => {
    return (
      <ClientForm
        // @ts-ignore
        formRef={this.FormRef}
        initialValues={this.getInitialValuesData}
        onSubmit={this.handleSubmit}
      />
    );
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        closeModal={() => {}}
        customClass="client-modal"
        needSave={true}
        btnAcceptSave={this.props.t("btn.save")}
        onSaveDenied={this.props.handleCloseModal}
        onSaveAccept={this.handleSaveAccept}
        canSave={true}
      >
        <div className="client-modal__form">
          {this.renderEditClientContent()}
        </div>
      </Modal>
    );
  }
}

export default withTranslation()(storeEnhancer(EditClientModal));
