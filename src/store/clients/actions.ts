import { Dispatch, AnyAction } from "redux";
import * as types from "./actionTypes";
import { IClient } from "./interfaces";

export const saveNewClient = (saveClientData: any) => (
  dispatch: Dispatch<AnyAction>
) => {
  dispatch({ type: types.CLIENT_ADD, payload: saveClientData });
};

export const removeClient = (id: string) => ({
  type: types.CLIENT_DELETE,
  payload: id,
});

export const editClient = (clientData: IClient) => ({
  type: types.CLIENT_EDIT,
  payload: clientData,
});

export const clientSetSearch = (term: string) => ({
  type: types.CLIENT_SET_SEARCH,
  payload: term,
});
