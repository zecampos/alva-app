import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import Login from "../pages/Login";
import RegisterPatient from "../pages/RegisterPatient";

import Home from "../pages/Home";
import CompleteProfile from "../pages/CompleteProfile";
import Check from "../pages/Check";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={RegisterPatient} />
      <Route path="/dashboard" isPrivate component={Home} />
      <Route path="/completeprofile" isPrivate component={CompleteProfile} />
      <Route path="/check" isPrivate component={Check} />
      {/* <Route path="/" component={() => <h1>404</h1>} /> */}
    </Switch>
  );
}
