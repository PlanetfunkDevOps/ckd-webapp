import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { Steps, Button } from "antd";
import EventForm from "./eventForm";
import Start from "./start";
import KitchenForm from "./kitchenForm";
import DetailsForm from "./detailsForm";
import PersonalInfo from "./personalInfo";
import Confirmation from "./confirmation";
import { Success } from "./success";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      confirmDirty: false,
      client_id: null,
      address: "",
      pax: "",
      preferences: "",
      energy: "",
      burners: "",
      oven: "",
      dateTime: "",
      restrictions: "",
      obs: "",
      name: "",
      password: "",
      email: "",
      phone: "",
      role: "client",
      status: "Waiting"
    };
  }

  static propTypes = {
    firebase: PropTypes.object.isRequired,
    firestore: PropTypes.object.isRequired
  };

  onSubmit = () => {
    const { firebase, firestore, history } = this.props;

    const { email, password, name, phone, role } = this.state;

    const {
      client_id,
      address,
      pax,
      preferences,
      energy,
      burners,
      oven,
      dateTime,
      restrictions,
      obs,
      status
    } = this.state;

    const newReservation = {
      client_id,
      address,
      pax,
      preferences,
      energy,
      burners,
      oven,
      dateTime,
      restrictions,
      obs,
      status
    };

    if (!this.props.user) {
      firebase
        .createUser({ email, password }, { name, email, phone, role })
        .then(userData => {
          const values = Object.assign({}, this.state, { client_id: this.props.user, user: this.props.profile })

          fetch("https://apichef.herokuapp.com/api/reservations", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-type": "application/json"
            }
          }).then(value => {
            history.push("/user")
          });
          // 
          // firestore
          //   .add({ collection: "reservations" }, this.state)
          //   .then(() => history.push("/user"));
          // console.log('this.state', this.state)
        })
        .catch(err => alert("That user already exists", "error"));
    } else {
      // firestore
      //   .add({ collection: "reservations" }, newReservation)
      //   .then(this.setStep(6));
      const values = Object.assign({}, this.state, { client_id: this.props.user, user: this.props.profile })
      fetch("https://apichef.herokuapp.com/api/reservations", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json"
        }
      }).then(value => {
        this.setStep(6)
      });
    }
  };

  next = () => {
    const { current } = this.state;
    const { user } = this.props;
    this.setState({
      current: current + 1,
      client_id: user
    });
  };

  prev = () => {
    const { current } = this.state;
    this.setState({
      current: current - 1
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  handleSelectChange = (label, value) => {
    this.setState({
      [label]: value
    });
  };

  handleRatio = (label, value) => {
    this.setState({
      [label]: value.target.value
    });
  };

  handleDate = (label, date, value) => {
    this.setState({
      [label]: value
    });
  };

  setStep = current => {
    this.setState({
      current
    });
  };

  render() {
    const { current } = this.state;

    const {
      address,
      pax,
      preferences,
      energy,
      burners,
      oven,
      dateTime,
      restrictions,
      obs,
      confirmDirty
    } = this.state;

    const values = {
      current,
      address,
      pax,
      preferences,
      energy,
      burners,
      oven,
      dateTime,
      restrictions,
      obs,
      confirmDirty
    };

    const { Step } = Steps;

    const steps = [
      {
        title: "Inicio",
        content: <Start />
      },
      {
        title: "Evento",
        content: (
          <EventForm
            handleChange={this.handleChange}
            handleSelectChange={this.handleSelectChange}
            next={this.next}
            prev={this.prev}
            values={values}
          />
        )
      },
      {
        title: "Cocina",
        content: (
          <KitchenForm
            handleSelectChange={this.handleSelectChange}
            handleRatio={this.handleRatio}
            next={this.next}
            prev={this.prev}
            values={values}
          />
        )
      },
      {
        title: "Detalles",
        content: (
          <DetailsForm
            handleChange={this.handleChange}
            handleDate={this.handleDate}
            next={this.next}
            prev={this.prev}
            values={values}
          />
        )
      },
      {
        title: "Confirmación",
        content: (
          <Confirmation
            next={this.next}
            prev={this.prev}
            values={values}
            onSubmit={this.onSubmit}
          />
        )
      },
      {
        title: "Datos Personales",
        content: (
          <PersonalInfo
            handleChange={this.handleChange}
            next={this.next}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            values={values}
          />
        )
      },
      {
        title: "Éxito",
        content: <Success />
      }
    ];

    const stepsStyles = {
      color: "white",
      marginTop: "16px",
      minHeight: "400px",
      textAlign: "center",
      paddingTop: "30px",
      width: "70%",
      margin: "auto"
    };

    const divStyle = {
      width: "95%",
      margin: "auto",
      paddingTop: "20px",
      color: "white"
    };

    const backGround = {
      height: "100vh",
      backgroundImage:
        "url('http://www.fondosni.com/images/2013-06-09/cucharas%20con%20diferentes%20alimentos-710592.jpg')",
      backgroundRepeat: "noRepeat",
      backgroundSize: "cover"
    };

    return (
      <div className="view view-request" style={backGround}>
        <div
          className="opacity"
          style={{ height: "100vh", backgroundColor: "rgba(0,0,0,.5)" }}
        >
          <div className="container reservation" style={divStyle}>
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div style={stepsStyles} className="steps-content">
              {steps[current].content}
            </div>
            <div style={{ textAlign: "center" }} className="button">
              {current === 0 && (
                <Button
                  type="primary"
                  onClick={() => this.next(steps[current].content)}
                >
                  Empecemos
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: state.firebase.auth.uid,
  profile: state.firebase.profile
});

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect(mapStateToProps)
)(Reservation);
