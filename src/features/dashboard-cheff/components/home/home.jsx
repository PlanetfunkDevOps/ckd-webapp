import React, { Component } from "react";
import { Breadcrumb, Card, Row, Col, Icon, Statistic } from "antd";

class Home extends Component {
  render() {
    return (
      <div className="view view-home">
        <Breadcrumb style={{ marginBottom: '20px' }} separator=">">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Rating"
                  value={11.28}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<Icon type="arrow-up" />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Servicios"
                  value={9.3}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<i className="far fa-star"></i>}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Comentarios"
                  value={9.3}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<Icon type="arrow-up" />}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export { Home };
