import { IStateClients } from "./clients/interfaces";
import { IStateTask } from "./tasks/interfaces";

export interface IRootState {
  client: IStateClients;
  task: IStateTask;
}
