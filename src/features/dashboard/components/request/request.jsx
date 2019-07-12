import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Card, Row, Col, Icon, Button, Modal } from "antd";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";

function CardDynamic(props) {
  const { idKey, data, handleDelete, onDiscard } = props;
  return (
    <Card
      className="card request__card mb-20"
      title={`Propuesta de ${data.chef.name}`}
    >
      <Row gutter={16}>
        <Col span={12}>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Abre boca</label>
            <div>
              <span className="fsize-12">{data.starter}</span>
            </div>
          </div>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Entrada</label>
            <div>
              <span className="fsize-12">{data.entry}</span>
            </div>
          </div>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Fondo</label>
            <div>
              <span className="fsize-12">{data.main}</span>
            </div>
          </div>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Postre</label>
            <div>
              <span className="fsize-12">{data.dessert}</span>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Abre boca descripcion</label>
            <div>
              <span className="fsize-12">{data.starter_desc}</span>
            </div>
          </div>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Entrada descripcion</label>
            <div>
              <span className="fsize-12">{data.entry_desc}</span>
            </div>
          </div>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Fondo descripcion</label>
            <div>
              <span className="fsize-12">{data.main_desc}</span>
            </div>
          </div>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Postre descripcion</label>
            <div>
              <span className="fsize-12">{data.entry_desc}</span>
            </div>
          </div>
        </Col>
      </Row>
      <div className="card__footer d-flex jc-space-between ai-center">
        <button onClick={() => onDiscard(data.id)}>
          <i className="fas fa-trash" />
        </button>
        <Button type="primary">
          <NavLink to={`/user/request/${idKey}/${data.chef_id}`}>Ver</NavLink>
        </Button>
      </div>
    </Card>
  );
}

class DashboardRequest extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  handleDelete = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  onDiscard = id => {
    const { firestore } = this.props;

    const updDiscard = {
      status: "Rejected"
    };

    firestore
      .update({ collection: "proposals", doc: id }, updDiscard)
      .catch(err => alert("Unable to reject proposal", "error"));
  };

  render() {
    const {
      match: {
        params: { id: keyId }
      },
      proposals = []
    } = this.props;

    const dataFilter = proposals.filter(
      proposal =>
        proposal.reservation_id === keyId && proposal.status === "Waiting"
    );

    return (
      <div className="view view-request">
        <Breadcrumb separator=">">
          {/* <Breadcrumb.Item>
            <NavLink to="/user">Inicio</NavLink>
          </Breadcrumb.Item> */}
          <Breadcrumb.Item>
            <NavLink to="/user/request">Solicitudes</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Propuestas Cheffs</Breadcrumb.Item>
        </Breadcrumb>
        <br />
        <h1 className="title c-white view-title">Propuestas Cheffs</h1>
        <br />
        {dataFilter.length > 0 ? (
          dataFilter.map((reservation, id) => {
            return (
              <CardDynamic
                idKey={keyId}
                data={reservation}
                key={id}
                onDiscard={this.onDiscard}
                onDelete={this.handleDelete}
                onCancel={this.handleCancel}
              />
            );
          })
        ) : (
          <Card className="card request__card mb-20">
            Aun no hay propuestas
          </Card>
        )}
        <Modal
          title="Eliminar propuesta"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Estas seguro que deseas eliminar esta propuesta?</p>
        </Modal>
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
)(DashboardRequest);
