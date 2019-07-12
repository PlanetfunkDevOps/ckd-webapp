import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Layout } from "antd";

import { Home } from "./components";
import DashboardRequests from './components/requests/requests';
import Proposal from "./components/proposal/proposal";
import Header from "../../components/header/header";
import { 
  Main, 
  Footer 
} from "../../components";
import Sidebar from '../../components/sidebar/sidebar';


function RoutingDashboardCheff(prop) {
  const {
    match: { path }
  } = prop;

  return (
    <React.Fragment>
      <Layout style={{ height: "100vh", padding: "64px 0px 60px" }}>
        <Header />
        <Layout>
          <Sidebar />
          <Main>
            <Switch>
              <Route exact path={`${path}/home`} component={Home} />
              <Route
                exact
                path={`${path}/request`}
                component={DashboardRequests}
              />
              <Route exact path={`${path}/request/:id`} component={Proposal} />
              {/* <Route exact path={`${path}/dishes`} component={RoutingDishes}></Route> */}
              {/* <Route exact path={`${path}/request-cheff`} component={DashboardRequestCheffs}></Route>
              <Route exact path={`${path}/request-cheff/:id`} component={DashboardRequestCheffDetail}></Route> */}
              <Redirect exact from={`${path}`} to={`${path}/request`} />
            </Switch>
          </Main>
        </Layout>
        <Footer />
      </Layout>
    </React.Fragment>
  );
}

export { RoutingDashboardCheff };
