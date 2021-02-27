import * as types from "./actionTypes";

export interface ITasksList {
  [key: string]: ITask;
}

export interface ITask {
  title: string;
  id?: string | number;
  deadline_ts?: number | null;
  description?: null;
  checked?: boolean;
  created_ts?: string | number;
}

export interface IStateTask {
  taskIds: string[];
  taskList: ITasksList;
  isAddTaskModalOpen: boolean;
  showChecked: boolean;
  showByDeadline: boolean;
  search: string;
}

export interface IEditTaskAction {
  type: typeof types.TASK_EDIT;
  payload: ITask;
}

export interface IRemoveTaskAction {
  type: typeof types.TASK_DELETE;
  payload: string | number;
}

export interface ISaveNewTaskAction {
  type: typeof types.TASK_ADD;
  payload: any;
}

export interface IToggleAddTaskModalAction {
  type: typeof types.TOGGLE_ADD_TASK_MODAL;
  payload: boolean;
}

export interface ISetSearchTaskAction {
  type: typeof types.TASK_SET_SEARCH;
  payload: boolean;
}

export type TypeAction =
  | IEditTaskAction
  | IRemoveTaskAction
  | ISaveNewTaskAction
  | IToggleAddTaskModalAction
  | ISetSearchTaskAction;
