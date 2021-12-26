import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./entry/Index";
import Sale from "./entry/Sale";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/sales">
          <Sale />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
