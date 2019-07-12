import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
  UserIsClient,
  UserIsChef
} from "../helpers/auth";

import { Landing, RoutingDashboard, RoutingDashboardCheff } from "../features";
import Reservation from "../features/reservation/components/reservation/reservation";
import WrappedLogin from "../features/login/components/login/login";
import WrappedRegister from "../features/register/components/register/register";
import history from "../api/history";

function RoutingRoot() {
  return (
    <Router history={history}>
      <Switch>
        {/* {(sessionStorage.getItem('type') === 'user') ? (
          <Route path="/user" component={RoutingDashboard} />
        ) : (
            <Route path="/cheff" component={RoutingDashboardCheff} />
          )} */}
        <Route path="/user" component={UserIsClient(RoutingDashboard)} />
        <Route path="/cheff" component={UserIsChef(RoutingDashboardCheff)} />
        <Route path="/reservation" component={Reservation} />
        <Route path="/home" component={Landing} />
        <Route path="/login" component={UserIsNotAuthenticated(WrappedLogin)} />
        <Route
          path="/register"
          component={UserIsNotAuthenticated(WrappedRegister)}
        />
        <Redirect exact from="/" to="/home" />
      </Switch>
    </Router>
  );
}

export { RoutingRoot };
