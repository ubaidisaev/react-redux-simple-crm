import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction, Dispatch } from "redux";

import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { IRootState } from "@/store/interfaces";
import { getDayAndMonthByTimeStamp, getSearchMatch } from "@/utils/base";
import Checkbox from "@/components/form-elements/checkbox/Checkbox";
import { editTask } from "@/store/tasks/actions";

import "./index.scss";

interface IProps {
  id: string;
  handleOpenTaskModal: (id: string) => void;
}

function mapStateToProps(state: IRootState, { id }: IProps) {
  const task = state.task.taskList[id];

  return {
    task,
    term: state.task.search,
  };
}

const mapDispatchToProps = { editTask };

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);

type AppProps = {} & ConnectedProps<typeof storeEnhancer> & IProps;

const TaskDayItem: React.FC<AppProps> = ({
  task,
  editTask,
  handleOpenTaskModal,
  id,
  term,
}) => {
  const { checked = false } = task;

  let itemClassName = "task-item";
  let titleClassName = "task-item__title";
  let dateClassName = "task-item__detail";

  if (task.deadline_ts) itemClassName += " task-item_has-footer";

  function handleOpenTask() {
    handleOpenTaskModal(id);
  }

  return (
    <div className={itemClassName} onClick={handleOpenTask}>
      <div className="task-item__checkbox">
        <Checkbox checked={checked} onChange={handleCheckedChange} />
      </div>
      <div className={titleClassName}>
        <span
          dangerouslySetInnerHTML={{
            __html: getSearchMatch(task.title, term),
          }}
        />
      </div>
      {task.deadline_ts && (
        <div className="task-item__detail-col">
          <div className={dateClassName}>
            <CalendarIcon className="task-item__detail-calendar-icon" />
            {getDayAndMonthByTimeStamp({
              stamp: task.deadline_ts,
              short: true,
            })}
          </div>
        </div>
      )}
    </div>
  );

  function handleCheckedChange(event: React.ChangeEvent<HTMLInputElement>) {
    editTask({
      ...task,
      checked: event.target.checked,
    });
  }
};

export default storeEnhancer(TaskDayItem);
