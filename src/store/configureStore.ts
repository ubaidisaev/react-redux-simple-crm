import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";


export default function configureStore(initialState?: any) {
  let store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk)
    )
  );

  return { store };
}
