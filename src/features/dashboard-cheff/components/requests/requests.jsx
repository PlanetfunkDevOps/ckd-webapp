import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Card, Row, Col, Icon, Button } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

function CardDynamic(props) {
  const { data, handleDelete } = props;
  console.log(data);

  return (
    <Card
      className="card request__card mb-20"
      title={`Oferta para ${data.dateTime}`}
    >
      <Row gutter={16}>
        <Col span={12}>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Numero de invitados</label>
            <div>
              <span className="fsize-12">{data.pax}</span>
            </div>
          </div>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Categoria de cocina</label>
            <div>
              <span className="fsize-12">{data.preferences}</span>
            </div>
          </div>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Tipo de cocina</label>
            <div>
              <span className="fsize-12">{data.energy}</span>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Fecha</label>
            <div>
              <span className="fsize-12">{data.dateTime}</span>
            </div>
          </div>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Direccion</label>
            <div>
              <span className="fsize-12">{data.address}</span>
            </div>
          </div>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Tiene horno</label>
            <div>
              <span className="fsize-12">{data.oven}</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Alergias</label>
            <div>
              <span className="fsize-12">{data.restrictions}</span>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="request__item mb-5">
            <label className="c-primary fsize-11">Comentarios</label>
            <div>
              <span className="fsize-12">{data.obs}</span>
            </div>
          </div>
        </Col>
      </Row>
      <div className="card__footer d-flex jc-space-between ai-center">
        <Icon type="delete" onClick={handleDelete} />
        <Button type="primary">
          <NavLink to={`/cheff/request/${data.id}`}>Enviar propuesta</NavLink>
        </Button>
      </div>
    </Card>
  );
}

class DashboardRequests extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reservations = [] } = this.props;
    return (
      <div className="view view-request">
        <h1 className="title c-white view-title">Ofertas: </h1>
        <br />
        {reservations.map((reservation, id) => {
          return <CardDynamic data={reservation} key={id} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reservations: state.firestore.ordered.reservations
});

export default compose(
  firestoreConnect([{ collection: "reservations" }]),
  connect(mapStateToProps)
)(DashboardRequests);
