import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import Login from "../pages/Login";
import Home from "../pages/Home";

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" isPrivate component={Home} />

      {/* <Route path="/" component={() => <h1>404</h1>} /> */}
    </Switch>
  );
}
