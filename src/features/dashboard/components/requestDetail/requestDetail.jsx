import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Card, Button, Modal } from "antd";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";

class DashboardRequestDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  /* showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  }; */

  confirm = () => {
    Modal.confirm({
      title: "Confirmar",
      content: "Deseas aceptar esta propuesta?",
      okText: "Aceptar",
      cancelText: "Cancelar",
      onOk: () => {
        const { firestore, history } = this.props;
        const {
          match: {
            params: { id }
          },
          match: {
            params: { user }
          },
          proposals = []
        } = this.props;
        const dataFilter =
          proposals.filter(proposal => proposal.chef_id === user)[0] || {};

        const proposalStatus = {
          status: "Accepted",
          chef: dataFilter.chef
        };

        const reservationStatus = {
          status: "Accepted"
        };

        firestore.update(
          { collection: "proposals", doc: dataFilter.id },
          proposalStatus
        );

        firestore
          .update(
            { collection: "reservations", doc: dataFilter.reservation_id },
            reservationStatus
          )
          .then(history.push("/user"));
      }
    });
  };

  render() {
    const {
      match: {
        params: { id }
      },
      match: {
        params: { user }
      },
      proposals = []
    } = this.props;

    const { visible } = this.state;

    const dataFilter =
      proposals.filter(proposal => proposal.chef_id === user)[0] || {};

    return (
      <div className="view view-request-detail">
        <Breadcrumb separator=">">
          {/* <Breadcrumb.Item>
            <NavLink to="/user">Home</NavLink>
          </Breadcrumb.Item> */}
          <Breadcrumb.Item>
            <NavLink to="/user/request">Solicitudes</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to={`/user/request/${id}`}>Solicitudes Chefs</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{dataFilter.chef.name}</Breadcrumb.Item>
        </Breadcrumb>
        <br />
        <h1 className="title c-white view-title">Propuestas del Chef {dataFilter.chef.name}</h1>
        <br />
        <div className="card">
          <Card bordered={false}>
            {/* <hr />
            <br /> */}
            <div className="content" style={{ textAlign: "center" }}>
              <h3>Abreboca</h3>
              <h5 className="c-primary">{dataFilter.starter}</h5>
              <p>{dataFilter.starter_desc}</p>
              <h3>Entrada</h3>
              <h5 className="c-primary">{dataFilter.entry}</h5>
              <p>{dataFilter.entry_desc}</p>
              <h3>Fondo</h3>
              <h5 className="c-primary">{dataFilter.main}</h5>
              <p>{dataFilter.main_desc}</p>
              <h3>Postre</h3>
              <h5 className="c-primary">{dataFilter.dessert}</h5>
              <p>{dataFilter.dessert_desc}</p>
            </div>
            <hr />
            <br />
            <div
              className="button"
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "space-evenly"
              }}
            >
              <Button type="secondary">
                <NavLink to={`/user/request/${id}`}>
                  Volver a propuestas
                </NavLink>
              </Button>
              <Button type="primary" onClick={this.confirm} props={this.props}>
                Aceptar propuesta
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  proposals: state.firestore.ordered.proposals
});

export default compose(
  firebaseConnect(),
  firestoreConnect([{ collection: "proposals" }]),
  connect(mapStateToProps)
)(DashboardRequestDetail);
