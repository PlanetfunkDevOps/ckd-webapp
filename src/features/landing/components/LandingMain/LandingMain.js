import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

import Hero from "./HeroSection/Hero";
import How from "./HowSection/How";
import Chef from "./ChefSection/Chef";
import Service from "./ServiceSection/Service";
import Spinner from "../../../../components/spinner/Spinner";

export class LandingMain extends Component {
  state = {
    wheelEnabled: true
  };

  moveUp = () => {
    const { wheelEnabled } = this.state;
    if (wheelEnabled) {
      this.props.prevStep();
      this.setState({ wheelEnabled: false });
      setTimeout(() => this.setState({ wheelEnabled: true }), 1000);
    }
  };

  moveDown = () => {
    const { wheelEnabled } = this.state;
    if (wheelEnabled) {
      this.props.nextStep();
      this.setState({ wheelEnabled: false });
      setTimeout(() => this.setState({ wheelEnabled: true }), 1000);
    }
  };

  componentDidMount() {
    document.addEventListener("wheel", e => {
      if (e.deltaY < 0) {
        this.moveUp();
      } else if (e.deltaY > 0) {
        this.moveDown();
      }
    });
  }

  render() {
    const { auth } = this.props;

    if (auth) {
      return (
        <Fragment>
          <Hero step={this.props.step} />
          <How step={this.props.step} />
          <Chef step={this.props.step} />
          <Service step={this.props.step} />
        </Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapStateToProps = (state, props) => ({
  auth: state.firebase.auth
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(LandingMain);
