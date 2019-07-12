import React, { Component } from "react";
import { Alert } from "antd";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import { Collapse } from "antd";
const { Panel } = Collapse;

class DashboardHome extends Component {
  redirect() {
    this.props.history.push("/user/request");
  }

  render() {
    const {
      reservations = [],
      proposals = [],
      auth: { uid }
    } = this.props;

    const dataFilterWaiting = reservations.filter(
      reservation =>
        reservation.client_id === uid && reservation.status === "Waiting"
    );

    const dataFilterAccepted = reservations.filter(
      reservation =>
        reservation.client_id === uid && reservation.status === "Accepted"
    );

    /*   */

    const dataFilterProp = proposals.filter(
      proposal =>
        proposal.user.client_id === uid && proposal.status === "Accepted"
    );

    console.log(dataFilterProp);

    return (
      <div className="view view-home">
        <h1 className="c-white view-title">Inicio</h1>
        <div className="c-pointer" onClick={this.redirect.bind(this)}>
          <br />
          <Alert
            message="Cantidad de solicitudes pendientes"
            description={`Tienes ${dataFilterWaiting.length} ${
              dataFilterWaiting.length > 1
                ? "solicitudes pendientes."
                : "solicitud pendiente."
            }`}
            type="info"
          />
        </div>
        <div>
          <br />
          <h2 className="c-white">Lista de solicitudes aceptadas.</h2>
          <Collapse accordion>
            {dataFilterProp.map(key => (
              <Panel
                key={key}
                header={`Tu solicitud fue aceptada por el chef ${
                  key.chef.name
                }`}
              >
                <ul>
                  <li>
                    <p>
                      <i className="fas fa-user-check" />
                      Chef: {key.chef.name}
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fab fa-whatsapp" /> {key.chef.phone}
                    </p>
                  </li>
                  <li>
                    <i className="far fa-envelope" />
                    {key.chef.email}
                  </li>
                </ul>
                <hr />
                <h5>Menu elegido pr el chef: </h5>
                <ul>
                  <li>
                    <p>
                      <i className="fas fa-bread-slice" />
                      Abreboca: {key.started}
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-bacon" />
                      Entrada: {key.entry}
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-drumstick-bite" />
                      Plato de Fondo: {key.main}
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-ice-cream" />
                      Postre: {key.dessert}
                    </p>
                  </li>
                </ul>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  auth: state.firebase.auth,
  reservations: state.firestore.ordered.reservations,
  proposals: state.firestore.ordered.proposals
});

export default compose(
  firebaseConnect(),
  firestoreConnect([
    { collection: "reservations" },
    { collection: "proposals" }
  ]),
  connect(mapStateToProps)
)(DashboardHome);
