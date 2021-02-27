import * as React from "react";
import TaskItem from "../task-item/TaskItem";
import "./index.scss";

interface IProps {
  title: string;
  tasks: {
    id: string;
    expired: boolean;
  }[];
  handleOpenTaskModal: (id: string) => void;
}

class TaskItemsList extends React.Component<IProps> {
  render() {
    return (
      <div className="task-items-list">
        {this.props.title && (
          <h2 className="task-items-list__title title">{this.props.title}</h2>
        )}
        <div>
          {this.props.tasks.map(({ id }, index) => {
            return (
              <TaskItem
                key={index}
                id={id}
                handleOpenTaskModal={this.props.handleOpenTaskModal}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default TaskItemsList;
