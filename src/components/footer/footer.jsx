import React from "react";
import { Layout } from 'antd';
import './footer.scss';

function Footer() {
  return (
    <Layout.Footer className="footer d-flex jc-space-between ai-center">
      <p className="m-0">Todos los derechos reservados | 2019</p>
      <p className="m-0"><a className="logo">Cook <span>on</span> Demand</a></p>
    </Layout.Footer>
  )
}

export {
  Footer
}
