import { combineReducers } from "redux";
import client from "./clients/reducer";
import task from "./tasks/reducer";

export default combineReducers({
  client,
  task,
});
