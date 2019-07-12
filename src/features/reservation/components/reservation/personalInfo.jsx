import React, { Component, Fragment } from "react";
import { Input, Form, Button } from "antd";

class PersonalInfo extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit();
        this.props.next();
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.props.values.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { handleChange, onChange, prev } = this.props;
    const { getFieldDecorator } = this.props.form;
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
          style={{ marginBottom: "20px", textAlign: "center", color: "white" }}
        >
          Ingresa tu información
        </h1>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Nombre">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Ingresa tu nombre completo!" }
              ]
            })(
              <Input
                onChange={handleChange("name")}
                placeholder="Ingrese tu nombre completo"
              />
            )}
          </Form.Item>
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "Ingresa un correo electrónico válido..."
                },
                { required: true, message: "Ingresa un correo valido!" }
              ]
            })(
              <Input
                onChange={handleChange("email")}
                placeholder="Ingresa tu correo electrónico"
              />
            )}
          </Form.Item>
          <Form.Item label="Contraseña" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Ingresa una contraseña!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input.Password
                name="password"
                onChange={onChange}
                placeholder="Ingresa una contraseña..."
              />
            )}
          </Form.Item>
          <Form.Item label="Confirmar Contraseña" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Confirma contraseña!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                name="password"
                onChange={onChange}
                placeholder="Confirma contraseña..."
                onBlur={this.handleConfirmBlur}
              />
            )}
          </Form.Item>
          <Form.Item
            label="Número de teléfono"
            style={{ marginBottom: "40px" }}
          >
            {getFieldDecorator("phone", {
              rules: [
                { required: true, message: "Ingresa tu número de télefono!" }
              ]
            })(
              <Input
                style={{ width: "100%", margin: "auto" }}
                onChange={handleChange("phone")}
                addonBefore={"+51"}
                placeholder="Ingresa tu número de télefono"
              />
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Reservar
          </Button>
        </Form>
      </Fragment>
    );
  }
}
const WrappedPersonal = Form.create({ name: "personal_info" })(PersonalInfo);

export default WrappedPersonal;
