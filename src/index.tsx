import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactModal from "react-modal";
import { Provider } from "react-redux";

import Clients from "@/components/clients/Clients";
import configureStore from "@/store/configureStore";
import { initLocale } from "@/localization";
import Navigation from "@/components/navigation/Navigation";
import Error404 from "@/pages/404/404";
import Tasks from "@/pages/Tasks/Tasks";

import "./styles/main.scss";
import "./styles/common.scss";

const { store } = configureStore();

const root = document.querySelector("#root");

ReactModal.setAppElement("#root");

initLocale();

const App = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={Navigation} />
      <Switch>
        <Route exact path="/" component={Clients} />
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/tasks" component={Tasks} />
        <Route component={Error404} />
      </Switch>
    </Router>
  </Provider>
);

render(<App />, root);
