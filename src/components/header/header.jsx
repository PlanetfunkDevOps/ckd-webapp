import React, { Component } from "react";
import { Layout, Menu, Icon, Dropdown, Button, Badge } from "antd";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import "./header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    firebase: PropTypes.object.isRequired
  };

  handleLogout = () => {
    const { firebase } = this.props;

    firebase.logout();
  };

  render() {
    const { name } = this.props.profile;

    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Icon type="user" />
          Mi cuenta
        </Menu.Item>
        <Menu.Item key="2" onClick={this.handleLogout}>
          <Icon type="logout" />
          Salir
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout.Header className="header d-flex jc-space-between ai-center">
        <NavLink className="header__logo logo" to="/">
          Cook <span>on</span> Demand
        </NavLink>
        <div className="user-nav d-flex f-justify">
          <Dropdown overlay={menu}>
            <Button>
              Hola {name}
              <Icon type="user" className="c-primary" />
            </Button>
          </Dropdown>
        </div>
      </Layout.Header>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: state.firebase.auth,
  profile: state.firebase.profile
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Header);
