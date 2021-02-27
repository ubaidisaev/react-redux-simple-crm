import * as types from "./actionTypes";
import { TypeAction } from "./interfaces";

import { IStateTask } from "./interfaces";

const initialState: IStateTask = {
  isAddTaskModalOpen: false,
  search: "",
  showByDeadline: true,
  showChecked: true,
  taskIds: [
    "113587c3-49f8-11eb-a680-0050560b2820",
    "f8758be3-4935-11eb-a680-0050560b2820",
    "f8769a9f-4935-11eb-a680-0050560b2820",
  ],
  taskList: {
    "113587c3-49f8-11eb-a680-0050560b2820": {
      id: "113587c3-49f8-11eb-a680-0050560b2820",
      deadline_ts: null,
      title: "Это новая задача",
      description: null,
      checked: true,
      created_ts: 1609261535,
    },
    "f8758be3-4935-11eb-a680-0050560b2820": {
      id: "f8758be3-4935-11eb-a680-0050560b2820",
      deadline_ts: 1614545999,
      title: "Вот и первая задача — посмотрите, что внутри",
      description: null,
      checked: true,
      created_ts: 1609178171,
    },
    "f8769a9f-4935-11eb-a680-0050560b2820": {
      id: "f8769a9f-4935-11eb-a680-0050560b2820",
      deadline_ts: null,
      title: "А вот и вторая. Только без срока, потому что так можно",
      description: null,
      checked: false,
      created_ts: 1609178171,
    },
  },
};

export default function reducer(state = initialState, action: TypeAction) {
  switch (action.type) {
    case types.TASK_ADD: {
      const task = action.payload;
      return {
        ...state,
        taskIds: [...state.taskIds, task.id],
        taskList: {
          ...state.taskList,
          [task.id]: task,
        },
      };
    }

    case types.TOGGLE_ADD_TASK_MODAL: {
      const show = action.payload;
      return {
        ...state,
        isAddTaskModalOpen: show,
      };
    }

    case types.TASK_EDIT: {
      const task = action.payload;
      const { id } = task;
      const taskList = { ...state.taskList };
      //@ts-ignore
      taskList[id] = task;
      return {
        ...state,
        taskList,
      };
    }
    case types.TASK_DELETE: {
      const id = action.payload;
      const taskIds = state.taskIds.filter((taskId) => taskId !== id);
      const taskList = { ...state.taskList };
      delete taskList[id];
      return {
        ...state,
        taskIds,
        taskList,
      };
    }
    case types.TASK_SET_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }
    default:
      return state;
  }
}
