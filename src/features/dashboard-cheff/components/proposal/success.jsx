import React, { Component } from "react";
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

class Success extends Component {
  state = {};
  render() {
    return (
      <div style={{ textAlign: 'center',  }} className="success">
        <h1 style={{ marginBottom: '40px' }}>¡Propuesta enviada!</h1>
        <hr/>
        <br/>
        <Button type='primary'>
          <NavLink to='/cheff/request'>Volver a solicitudes</NavLink>
        </Button>
      </div>
    );
  }
}

export { Success };
