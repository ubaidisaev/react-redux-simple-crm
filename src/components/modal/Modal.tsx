import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import ReactModal from "react-modal";

import Button, { ButtonColor } from "@/components/form-elements/button/Button";
import { CloseIcon } from "@/components/icons";

import "./index.scss";

interface IModalProps {
  title?: string;
  customClass?: string;
  closeModal: () => void;
  isOpen: boolean;
  onSaveDenied?: () => void;
  btnDeniedSave?: string;
  needSave?: boolean;
  btnAcceptSave?: string;
  btnAcceptSaveColor?: ButtonColor;
  onSaveAccept?: () => void;
  showCloseIcon?: boolean;
  canSave?: boolean;
}

class Modal extends React.Component<IModalProps & WithTranslation> {
  getModalHeader = (props: React.PropsWithChildren<IModalProps>) => {
    if (props.title) {
      return (
        <div className="react-modal__header">
          <div className="react-modal__title ">{props.title}</div>
        </div>
      );
    }
  };

  warnConfirm() {
    console.warn("В модальное окно не передан обработчик для подтверждения");
  }
  getModalCloseIcon = (props: React.PropsWithChildren<IModalProps>) => {
    if (props.showCloseIcon && !props.title) {
      return (
        <div className="react-modal__native-close">
          <span
            style={{ display: "block", width: "20px", height: "20px" }}
            className="react-modal__close-icon wd-ico-exit"
            onClick={() => this.props.closeModal()}
          >
            <CloseIcon />
          </span>
        </div>
      );
    }
  };

  getModalSave = (props: React.PropsWithChildren<IModalProps>) => {
    const {
      canSave = false,
      onSaveDenied,
      btnDeniedSave = this.props.t("btn.cancel"),
      btnAcceptSave = this.props.t("btn.create"),
      btnAcceptSaveColor = "inline-red",
      onSaveAccept = this.warnConfirm,
    } = props;
    return (
      <div className="react-modal__save-wrap">
        <div className="react-modal__save">
            <Button
              customClassName="se-modal-save-denied mr-10"
              onClick={onSaveDenied}
              size="medium"
              color="inline-black"
            >
              {btnDeniedSave}
            </Button>

            <Button
              customClassName="se-modal-save-confirm"
              onClick={onSaveAccept}
              color={btnAcceptSaveColor}
              size="medium"
              disabled={!canSave}
              // isLoading={btnAcceptLoading}
              // showLoading={btnAcceptShowLoading}
            >
              {btnAcceptSave}
            </Button>

        </div>
      </div>
    );
  };

  render() {
    const { customClass, needSave } = this.props;

    let className = `react-modal__window${
      customClass ? " react-modal__window_" + customClass : ""
    }`;
    let overlayClassName = `react-modal__overlay`;
    let contentClassName = `react-modal__content`;

    if (needSave) {
      className += " react-modal__window_can-save";
    }

    return (
      <ReactModal
        onRequestClose={this.props.closeModal}
        className={className}
        portalClassName="react-modal"
        overlayClassName={overlayClassName}
        isOpen={this.props.isOpen}
        closeTimeoutMS={100}
      >
        {this.getModalHeader(this.props)}
        {this.getModalCloseIcon(this.props)}
        <div className={contentClassName}>{this.props.children}</div>
        {needSave && this.getModalSave(this.props)}
      </ReactModal>
    );
  }
}

export default withTranslation()(Modal);
