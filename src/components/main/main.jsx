import React from "react";
import { Layout } from "antd";
import "./main.scss";

function Main(props) {
  const { children } = props;

  return (
    <Layout.Content className="main">
      <div className='background'>{children}</div>
    </Layout.Content>
  );
}

export { Main };
