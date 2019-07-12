import React, { Component } from "react";
import { Link } from "react-router-dom";
class Success extends Component {
  render() {
    return (
      <div className="success">
        <h1 style={{ color: "white", marginBottom: '40px' }}>Reserva Confirmada</h1>
        <p style={{ color: "white", marginBottom: '40px' }}>
          Tu chef se pondrá en contacto contigo lo antes posible para coordinar
          tu evento
        </p>
        <Link className="ant-btn ant-btn-primary" to="/user" type="primary">
          Continuar
        </Link>
      </div>
    );
  }
}
export { Success };
