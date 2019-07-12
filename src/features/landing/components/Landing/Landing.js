import React, { Component, Fragment } from "react";

import LandingMain from "../LandingMain/LandingMain";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Index from "../Index/Index";
import Navigation from "../Navigation/Navigation";
import "./landing.scss";

export class Landing extends Component {
  state = {
    step: 1
  };

  nextStep = () => {
    const { step } = this.state;
    if (step + 1 < 5) {
      this.setState({ step: step + 1 });
    }
  };

  prevStep = () => {
    const { step } = this.state;
    if (step - 1 > 0) {
      this.setState({ step: step - 1 });
    }
  };

  handleStepIndex = id => {
    const stepId = parseInt(id);
    if (stepId) {
      this.setState({ step: stepId });
    }
  };

  render() {
    const { step } = this.state;

    return (
      <Fragment>
        <Header prevProps={this.props} handleIsAuth={this.handleIsAuth} />
        <LandingMain
          step={step}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
        />
        <Index step={step} handleStepIndex={this.handleStepIndex} />
        <Navigation nextStep={this.nextStep} prevStep={this.prevStep} />
        {/* <Footer /> */}
      </Fragment>
    );
  }
}

export default Landing;
