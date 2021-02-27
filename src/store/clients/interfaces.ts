import * as types from "./actionTypes";

export interface IClient {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  company_name: string;
  note: string;
  meta: {
    tel: { value: string | number }[];
    email: { value: string | number }[];
  };
}

export interface IClientsList {
  [key: string]: IClient
}

export interface IStateClients {
  clientsIds: string[];
  clientsList: IClientsList;
  search: string;
}

export interface IClientsSetSearchAction {
  type: typeof types.CLIENT_SET_SEARCH;
  payload: string;
}

export interface IClientsAddClientAction {
  type: typeof types.CLIENT_ADD;
  payload: any;
}

export interface IClientDeleteAction {
  type: typeof types.CLIENT_DELETE;
  payload: string;
}

export interface IClientEditAction {
  type: typeof types.CLIENT_EDIT;
  payload: IClient;
}

export type TypeAction =
  | IClientsSetSearchAction
  | IClientsAddClientAction
  | IClientDeleteAction
  | IClientEditAction;
