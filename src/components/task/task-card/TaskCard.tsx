import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";

import { CloseIcon, RemoveIcon } from "@/components/icons";
import { IRootState } from "@/store/interfaces";
import { editTask, removeTask } from "@/store/tasks/actions";
import ModalConfirm from "@/components/modal-confirm/ModalConfirm";
import Datepicker from "@/components/form-elements/datepicker/Datepicker";
import { ITask } from "@/store/tasks/interfaces";

import "./index.scss";

interface ITaskCardProps {
  tasks_id: string;
  handleCloseModal: () => void;
}

const mapStateToProps = (state: IRootState, { tasks_id }: ITaskCardProps) => {
  const task = tasks_id ? state.task.taskList[tasks_id] : ({} as ITask);


  return { task };
};

const mapDispatchToProps = {
  editTask,
  removeTask,
};

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof storeEnhancer> &
  ITaskCardProps &
  WithTranslation;

type AppProps = {} & PropsFromRedux;

interface IState {
  showDeleteModal: boolean;
}

class TaskCard extends React.Component<AppProps> {
  state: IState = {
    showDeleteModal: false,
  };

  handleShowDeleteTaskModal = () => {
    this.setState({ showDeleteModal: true });
  };

  handleCancelTaskDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  handleConfirmDeleteTask = () => {
    this.props.removeTask(this.props.tasks_id);
    this.closeModal();
  };

  closeModal = () => {
    this.props.handleCloseModal();
  };

  renderHeader = () => {
    return (
      <div className="form-modal__header grid-middle-noBottom">
        <div className="form-modal__header-col">
          <RemoveIcon width={20} />
        </div>
        <div className="form-modal__header-col">
          <CloseIcon onClick={this.closeModal} width={20} />
        </div>
      </div>
    );
  };

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { name, value } = event.target;

    const data = {
      ...this.props.task,
      [name]: value,
    };

    return this.props.editTask(data);
  };

  handleDateChange = (date: any) => {
    const data = {
      ...this.props.task,
      deadline_ts: date?.getTime(),
    };

    return this.props.editTask(data);
  };

  handleDeadlineRemove = () => {
    const data = {
      ...this.props.task,
      deadline_ts: null,
    };
    return this.props.editTask(data);
  };

  render() {
    const task = this.props.task;
    const title = task ? task.title : "";
    const deadline_ts = task && task.deadline_ts ? new Date(task.deadline_ts) : null;
    return (
      <>
        <div className="tasks-card">
          <div className="tasks-card__task">
            <div className="tasks-card__controls">
              <RemoveIcon
                onClick={this.handleShowDeleteTaskModal}
                className="tasks-card__remove-icon"
              />
              <CloseIcon
                onClick={this.closeModal}
                className="tasks-card__close-icon"
              />
            </div>
            <div className="tasks-card__content">
              <div className="form-modal form-modal_task">
                <div className="form-modal__title-wrap">
                  <textarea
                    name="title"
                    className="form-modal__title-textarea"
                    value={title}
                    onChange={this.handleChange}
                  />
                </div>

                <Datepicker
                  deadline_ts={deadline_ts}
                  onChange={this.handleDateChange}
                  onDeadlineRemove={this.handleDeadlineRemove}
                />
              </div>
            </div>
          </div>
        </div>
        <ModalConfirm
          isOpen={this.state.showDeleteModal}
          customClass="small-indent"
          handleCloseModal={this.handleCancelTaskDeleteModal}
          handleConfirm={this.handleConfirmDeleteTask}
        >
          <div className="modal-confirm__title">
            {this.props.t("tasks.confirm_remove.title")}
          </div>
        </ModalConfirm>
      </>
    );
  }
}

export default withTranslation()(storeEnhancer(TaskCard));
