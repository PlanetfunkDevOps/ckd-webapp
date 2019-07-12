import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Card } from "antd";
import { WrappedProposal } from "./proposalInputs";
import { Confirmation } from "./confirmation";
import { Success } from "./success";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class Proposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      reservation_id: null,
      chef_id: null,
      starter: "",
      starter_desc: "",
      entry: "",
      entry_desc: "",
      main: "",
      main_desc: "",
      dessert: "",
      dessert_desc: "",
      status: "Waiting"
    };
  }

  static propTypes = {
    firebase: PropTypes.object.isRequired
  };

  componentDidMount() {
    const userId = { ...this.props.user };
    const owner = userId.uid;
    const reserveId = this.props.match.params.id;

    this.setState({ reservation_id: reserveId, chef_id: owner });
  }

  onSubmit = () => {
    const {
      reservation_id,
      chef_id,
      starter,
      starter_desc,
      entry,
      entry_desc,
      main,
      main_desc,
      dessert,
      dessert_desc,
      status
    } = this.state;

    const { 
      firestore,
      history,
      match: {
        params: { id }
      },
      reservations = []
    } = this.props;

    const userReservation =
    reservations.filter(reservation => reservation.id == id)[0] || {};


    const newProposal = {
      reservation_id,
      chef_id,
      starter,
      starter_desc,
      entry,
      entry_desc,
      main,
      main_desc,
      dessert,
      dessert_desc,
      status,
      chef: this.props.profile,
      user: userReservation
    };

    firestore
      .add({ collection: "proposals" }, newProposal)
      .then(() => history.push("/cheff"));
  };

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  next = () => {
    const step = this.state.step;
    this.setState({
      step: step + 1
    });
  };

  prev = () => {
    const step = this.state.step;
    this.setState({
      step: step - 1
    });
  };

  render() {
    const {
      match: {
        params: { id }
      },
      reservations = []
    } = this.props;

    const userReservation =
      reservations.filter(reservation => reservation.id == id)[0] || {};

    const { step } = this.state;
    const {
      starter,
      starter_desc,
      entry,
      entry_desc,
      main,
      main_desc,
      dessert,
      dessert_desc
    } = this.state;

    const values = {
      starter,
      starter_desc,
      entry,
      entry_desc,
      main,
      main_desc,
      dessert,
      dessert_desc
    };

    switch (step) {
      case 1:
        return (
          <div className="view view-request-detail">
            <Breadcrumb separator=">">
              {/* <Breadcrumb.Item>
                <NavLink to="/cheff">Home</NavLink>
              </Breadcrumb.Item> */}
              <Breadcrumb.Item>
                <NavLink to="/cheff/request">Solicitudes</NavLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Propuesta</Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <h1 className="title c-white view-title">
              Solicitud de {userReservation.name}
            </h1>
            <br />
            <Card className="content">
              <h2>Propuesta</h2>
              <hr />
              <br />
              <WrappedProposal
                next={this.next}
                handleChange={this.handleChange}
                values={values}
              />
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="view view-request-detail">
            <Breadcrumb separator=">">
              {/* <Breadcrumb.Item>
                <NavLink to="/cheff">Home</NavLink>
              </Breadcrumb.Item> */}
              <Breadcrumb.Item>
                <NavLink to="/cheff/request">Solicitudes</NavLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Propuesta</Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <h1 className="title c-white">Solicitud de {userReservation.name}</h1>
            <br />
            <Card className="content">
              <h2>Solicitud 22/06/19</h2>
              <hr />
              <Confirmation
                next={this.next}
                prev={this.prev}
                onSubmit={this.onSubmit}
                values={values}
              />
            </Card>
          </div>
        );
      case 3:
        return (
          <div
            className="view view-request-detail"
            style={{ height: "79.6vh" }}
          >
            <Breadcrumb separator=">">
              {/* <Breadcrumb.Item>
                <NavLink to="/cheff">Home</NavLink>
              </Breadcrumb.Item> */}
              <Breadcrumb.Item>
                <NavLink to="/cheff/request">Solicitudes</NavLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Propuesta</Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <h1 className="title c-white view-title">Solicitud de {userReservation.name}</h1>
            <br />
            <Card className="content">
              <Success />
            </Card>
          </div>
        );
    }
  }
}

const mapStateToProps = (state, props) => ({
  user: state.firebase.auth,
  profile: state.firebase.profile,
  reservations: state.firestore.ordered.reservations
});

export default compose(
  firebaseConnect(),
  firestoreConnect([{ collection: "reservations" }]),
  connect(mapStateToProps)
)(Proposal);
