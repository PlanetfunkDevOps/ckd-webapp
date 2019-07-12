import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";

import "./sidebar.scss";

function ItemUser() {
  return (
    <React.Fragment>
      <Menu>
        <Menu.Item>
          <NavLink
            to="/user/home"
            activeClassName="is-active ant-menu-item-selected"
          >
            Inicio
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/reservation">Crear reserva</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink
            to="/user/request"
            activeClassName="is-active ant-menu-item-selected"
          >
            Solicitudes
          </NavLink>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
}

function ItemCheff() {
  return (
    <React.Fragment>
      <Menu>
        <Menu.Item>
          <NavLink
            to="/cheff/home"
            activeClassName="is-active ant-menu-item-selected"
          >
            Inicio
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink
            to="/cheff/request"
            activeClassName="is-active ant-menu-item-selected"
          >
            Ofertas
          </NavLink>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
}

function Sidebar(props) {
  return (
    <Layout.Sider className="sidebar">
      {props.profile.isLoaded ? (
        props.profile.role === "client" ? (
          <ItemUser />
        ) : (
          <ItemCheff />
        )
      ) : (
        ""
      )}
    </Layout.Sider>
  );
}

function mapStateToProps(state) {
  return { profile: state.firebase.profile };
}

export default connect(mapStateToProps)(Sidebar);
