import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

import Button from "@/components/form-elements/button/Button";
import Modal from "@/components/modal/Modal";

import "./index.scss";

interface IModalConfirmProps {
  isOpen: boolean;
  customClass?: string;
  handleCloseModal: () => void;
  handleConfirm: () => void;
}

class ModalConfirm extends React.Component<
  IModalConfirmProps & WithTranslation
> {
  render() {
    return (
      <Modal
        customClass={this.props.customClass}
        isOpen={this.props.isOpen}
        closeModal={this.props.handleCloseModal}
        showCloseIcon={true}
      >
        <div className="modal-confirm">
          <div className="modal-confirm__content">{this.props.children}</div>
          <div className="modal-confirm__controls">
            <div className="modal-confirm__control">
              <Button
                color="transparent-black"
                onClick={this.props.handleCloseModal}
              >
                {this.props.t("btn.cancel_2")}
              </Button>
            </div>
            <div className="modal-confirm__control">
              <Button
                onClick={this.props.handleConfirm}
                color="red-white"
              >
                {this.props.t("btn.remove")}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withTranslation()(ModalConfirm);
