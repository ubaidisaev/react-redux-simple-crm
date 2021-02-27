import * as React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import Datepicker from "@/components/form-elements/datepicker/Datepicker";
import Modal from "@/components/modal/Modal";
import { saveNewTask } from "@/store/tasks/actions";

import "./index.scss";

const mapDispatchToProps = { saveNewTask };

const storeEnhancer = connect(() => ({}), mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof storeEnhancer>;

interface IAddTaskModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
}

type AppProps = {} & IAddTaskModalProps & WithTranslation & PropsFromRedux;

type IState = {
  deadline_ts: Date | null;
  title: string;
};

class AddTaskModal extends React.Component<AppProps> {
  state: IState = {
    deadline_ts: null,
    title: "",
  };

  handleDateChange = (date: Date | [Date, Date] | null) => {
    this.setState({ deadline_ts: date });
  };

  handleDeadlineRemove = () => {
    this.setState({ deadline_ts: null });
  };

  handleSubmit = () => {
    this.props.saveNewTask({
      id: uuidv4(),
      title: this.state.title,
      deadline_ts: this.state.deadline_ts?.getTime(),
    });
    this.props.handleCloseModal();
    this.clearTask();
  };

  clearTask = () => {
    this.setState({ deadline_ts: null, title: "" });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    this.setState({ title: value });
  };

  get isFormValid() {
    return this.state.title.length > 0;
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        closeModal={this.props.handleCloseModal}
        onSaveDenied={this.props.handleCloseModal}
        title={this.props.t("tasks.modal.create_title")}
        needSave={true}
        onSaveAccept={this.handleSubmit}
        canSave={this.isFormValid}
      >
        <div className="add-task-modal">
          <div className="add-task-modal__title-wrap">
            <textarea
              placeholder={this.props.t("form.name")}
              className={"add-task-modal__title-textarea"}
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
          </div>
          <Datepicker
            deadline_ts={
              this.state.deadline_ts ? new Date(this.state.deadline_ts) : null
            }
            onChange={this.handleDateChange}
            onDeadlineRemove={this.handleDeadlineRemove}
            placeholder="form.deadline"
          />
        </div>
      </Modal>
    );
  }
}

export default withTranslation()(storeEnhancer(AddTaskModal));
