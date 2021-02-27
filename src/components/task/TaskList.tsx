import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { WithTranslation, withTranslation } from "react-i18next";

import Button from "@/components/form-elements/button/Button";
import { IRootState } from "@/store/interfaces";
import TaskDayList from "./task-items-list/TaskItemsList";
import TaskCard from "./task-card/TaskCard";
import { getFilteredAndSortedByDeadlineTasks } from "@/utils/base";
import { toggleAddTaskModal } from "@/store/tasks/actions";

import "./index.scss";

const mapDispatchToProps = { toggleAddTaskModal };

function mapStateToProps(state: IRootState, props: WithTranslation) {

  const tasks = getFilteredAndSortedByDeadlineTasks(state, props.t);
  return { tasks };
}

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof storeEnhancer>;

interface IState {
  isTaskCardOpen: boolean;
  taskCardId: string;
}

type AppProps = {} & PropsFromRedux & WithTranslation;

class TaskList extends React.Component<AppProps> {
  state: IState = {
    isTaskCardOpen: false,
    taskCardId: "",
  };
  renderTaskList() {
    return this.props.tasks
      .filter((task) => task.list.length)
      .map((task, index) => {
        return (
          <TaskDayList
            handleOpenTaskModal={this.handleToggleTaskCard}
            key={index}
            title={task.title}
            tasks={task.list}
          />
        );
      });
  }

  handleToggleTaskCard = (id = "") => {
    this.setState({
      isTaskCardOpen: !!id,
      taskCardId: id ? id : null,
    });
  };

  handleShowAddTaskModal = () => {
    this.props.toggleAddTaskModal(true);
  };

  render() {
    return (
      <div className={`tasks__content`}>
        <div className="tasks__list-wrapper">
          <div className="tasks__list">
            <div className="tasks__controls">
              <Button
                color="black-white"
                width="auto"
                onClick={this.handleShowAddTaskModal}
              >
                + Создать задачу
              </Button>
            </div>
            {this.renderTaskList()}
          </div>
        </div>
        <CSSTransition
          in={this.state.isTaskCardOpen}
          timeout={450}
          classNames="task-box"
          unmountOnExit
        >
          <TaskCard
            tasks_id={this.state.taskCardId}
            handleCloseModal={this.handleToggleTaskCard}
          />
        </CSSTransition>
      </div>
    );
  }
}

export default withTranslation()(storeEnhancer(TaskList));
