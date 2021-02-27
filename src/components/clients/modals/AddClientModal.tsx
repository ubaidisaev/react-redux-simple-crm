import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { WithTranslation, withTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import Modal from "@/components/modal/Modal";
import ClientForm from "@/components/clients/forms/ClientForm";
import { saveNewClient } from "@/store/clients/actions";

interface IModalProps {
  handleCloseModal: () => void;
  isOpen: boolean;
}

interface IState {
  client: any;
}

const mapDispatchToProps = { saveNewClient };

const storeEnhancer = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof storeEnhancer>;

type AppProps = {} & PropsFromRedux & IModalProps & WithTranslation;

class AddClientModal extends React.Component<AppProps> {
  private FormRef = React.createRef<any>();

  readonly state: IState = {
    client: this.getClearClient,
  };

  get getClearClient() {
    return {
      first_name: "",
      last_name: "",
      middle_name: "",
      company_name: "",
      note: "",
      meta: { tel: [{}], email: [{}], url: [{}] },
    };
  }

  handleSubmit = (data: any) => {
    let newClientId = uuidv4();
    data.id = newClientId;
    this.props.saveNewClient(data);
    this.closeModalAndClear();
  };

  closeModalAndClear = () => {
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.props.handleCloseModal();
  };

  handleSaveAccept = () => {
    if (this.FormRef && this.FormRef.current) this.FormRef.current.click();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        customClass="client-modal"
        closeModal={this.handleCloseModal}
        needSave={true}
        onSaveDenied={this.props.handleCloseModal}
        onSaveAccept={this.handleSaveAccept}
        title={this.props.t("clients.modal.title")}
        // canSave={this.props.isValid}
        canSave={true}
      >
        <div className="client-modal__form">
          <div className="client-modal__form">
            <ClientForm
              // @ts-ignore
              formRef={this.FormRef}
              initialValues={this.state.client}
              onSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default withTranslation()(storeEnhancer(AddClientModal));
