import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";

import Layout from "@/components/layout/Layout";
import TaskList from "@/components/task/TaskList";
import AddTaskModal from "@/components/task/modals/AddTaskModal";
import { IRootState } from "@/store/interfaces";
import { toggleAddTaskModal } from "@/store/tasks/actions";
import TasksNav from "@/components/task/tasks-nav/TasksNav";

const mapStateToProps = (state: IRootState) => {
  const { isAddTaskModalOpen } = state.task;

  return { isAddTaskModalOpen };
};

const mapDispatchToProps = { toggleAddTaskModal };

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof storeEnhancer>;

type AppProps = {} & PropsFromRedux & WithTranslation;

class Tasks extends React.Component<AppProps> {
  renderTaskContent = () => {
    return (
      <div className="tasks">
        <TaskList />
      </div>
    );
  };

  handleCloseModal = () => {
    this.props.toggleAddTaskModal(false);
  };

  handleOpenModal = () => {
    this.props.toggleAddTaskModal(true);
  };

  render() {
    let taskContent;
    taskContent = this.renderTaskContent();
    return (
      <Layout
        title={this.props.t("tasks.title")}
        nav={<TasksNav onClick={this.handleOpenModal} />}
      >
        {taskContent}
        <AddTaskModal
          isOpen={this.props.isAddTaskModalOpen}
          handleCloseModal={this.handleCloseModal}
        />
      </Layout>
    );
  }
}

export default withTranslation()(storeEnhancer(Tasks));
