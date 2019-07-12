import React, { Component, Fragment } from "react";
import { Input, Form, DatePicker, Button } from "antd";

class DetailsForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.next();
      }
    });
  };

  render() {
    const { handleChange, handleDate, prev } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 10 }
      }
    };
    return (
      <Fragment>
        <h1
          style={{ marginBottom: "10px", textAlign: "center", color: "white" }}
        >
          Ahora veamos algunos detalles
        </h1>
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Form.Item label="Fecha">
            {getFieldDecorator("dateTime", {
              rules: [
                {
                  type: "object",
                  required: true,
                  message: "Seleccione la fecha"
                }
              ]
            })(
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Selecciona una fecha"
                onChange={handleDate.bind(this, "dateTime")}
              />
            )}
          </Form.Item>
          <Form.Item label="Restricciones">
            {getFieldDecorator("restrictions", {
              initialValue: this.props.values.restrictions,
              rules: [{ required: false, message: "" }]
            })(
              <TextArea
                onChange={handleChange("restrictions")}
                placeholder="Ingrese alergias o intolerancia"
              />
            )}
          </Form.Item>
          <Form.Item label="Observaciones" style={{ paddingBottom: "40px" }}>
            {getFieldDecorator("obs", {
              initialValue: this.props.values.obs,
              rules: [
                {
                  required: false,
                  message: "Algún comentario u observación que desea agregar?"
                }
              ]
            })(
              <TextArea
                onChange={handleChange("obs")}
                placeholder="Algún comentario u observación que desea agregar?"
              />
            )}
          </Form.Item>
          <div
            style={{ display: "flex", justifyContent: "space-evenly" }}
            className="buttons"
          >
            <Button type="secondary" onClick={prev}>
              Anterior
            </Button>
            <Button type="primary" htmlType="submit">
              Siguiente
            </Button>
          </div>
        </Form>
      </Fragment>
    );
  }
}
const WrappedApp = Form.create({ name: "details_form" })(DetailsForm);

export default WrappedApp;
