import React, { Component } from "react";
import { Row, Col, Button } from "antd";

class Confirmation extends Component {
  onClick = e => {
    this.props.onSubmit();
    this.props.next();
  };

  render() {
    const { values, prev } = this.props;

    return (
      <div className="confirmation">
        <div className="content" style={{ textAlign: "center" }}>
          <h1 style={{ color: "black" }}>Confirma tu propuesta</h1>
          <h3 style={{ color: "#ff6700" }}>Abreboca</h3>
          <h5>{values.starter}</h5>
          <p>{values.starter_desc}</p>
          <h3 style={{ color: "#ff6700" }}>Entrada</h3>
          <h5>{values.entry}</h5>
          <p>{values.entry_desc}</p>
          <h3 style={{ color: "#ff6700" }}>Fondo</h3>
          <h5>{values.main}</h5>
          <p>{values.main_desc}</p>
          <h3 style={{ color: "#ff6700" }}>Postre</h3>
          <h5>{values.dessert}</h5>
          <p>{values.dessert_desc}</p>
        </div>
        <hr />
        <br />
        <div
          style={{ display: "flex", justifyContent: "space-evenly" }}
          className="buttons"
        >
          <Button type="secondary" onClick={prev}>
            Anterior
          </Button>
          <Button type="primary" onClick={this.onClick}>
            Siguiente
          </Button>
        </div>
      </div>
    );
  }
}

export { Confirmation };
