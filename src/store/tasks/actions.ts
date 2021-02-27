import * as types from "./actionTypes";
import { ITask } from "./interfaces";

export const editTask = (task: ITask) => ({
  type: types.TASK_EDIT,
  payload: task,
});

export const removeTask = (id: string) => ({
  type: types.TASK_DELETE,
  payload: id,
});

export const saveNewTask = (task: ITask) => ({
  type: types.TASK_ADD,
  payload: task,
});

export const toggleAddTaskModal = (show: boolean) => ({
  type: types.TOGGLE_ADD_TASK_MODAL,
  payload: show,
});

export const setSearch = (term: string) => ({
  type: types.TASK_SET_SEARCH,
  payload: term,
});
