import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import DashboardHome from './components/home/home';
import DashboardRequests from './components/requests/requests';
import DashboardRequest from './components/request/request';
import DashboardRequestDetail from './components/requestDetail/requestDetail';

import { Main, Footer } from '../../components';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';

function RoutingDashboard(prop) {
  const {
    match: { path }
  } = prop;

  return (
    <React.Fragment>
      <Layout style={{ height: '100vh', padding: '64px 0px 60px' }}>
        <Header />
        <Layout>
          <Sidebar />
          <Main>
            <Switch>
              <Route exact path={`${path}/home`} component={DashboardHome} />
              <Route
                exact
                path={`${path}/request`}
                component={DashboardRequests}
              />
              <Route
                exact
                path={`${path}/request/:id`}
                component={DashboardRequest}
              />
              <Route
                exact
                path={`${path}/request/:id/:user`}
                component={DashboardRequestDetail}
              />
              <Redirect exact from={`${path}`} to={`${path}/home`} />
            </Switch>
          </Main>
        </Layout>
        <Footer />
      </Layout>
    </React.Fragment>
  );
}

export { RoutingDashboard };
