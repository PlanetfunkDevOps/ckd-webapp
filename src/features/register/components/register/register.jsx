import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "chef"
  };

  handleSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { name, email, password, phone, role } = this.state;

    firebase
      .createUser({ email, password }, { name, email, phone, role })
      .then(userData => {
        console.log("User: ", userData);
        console.log(this.props.user);
      })
      .catch(err => alert("That user already exists", "error"));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Las contraseñas deben ser iguales!");
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
    const { getFieldDecorator } = this.props.form;

    const backGround = {
      height: "100vh",
      backgroundImage:
        "url('http://lavinyagrill.com/wp-content/uploads/2015/06/iStock_000046272610_Large.jpg')",
      backgroundRepeat: "noRepeat",
      backgroundSize: "cover"
    };

    return (
      <div className="view view-request" style={backGround}>
        <div
          className="opacity"
          style={{ height: "100vh", backgroundColor: "rgba(0,0,0,.5)" }}
        >
          <div
            className="container register"
            style={{ width: "50%", margin: "auto" }}
          >
            <h1
              style={{
                color: "white",
                textAlign: "center",
                paddingTop: "40px"
              }}
            >
              Registro <span style={{ color: "#ff6700" }}>de</span> Chef
            </h1>
            <Form
              style={{ width: "70%", margin: "auto" }}
              // {...formItemLayout}
              onSubmit={this.handleSubmit}
            >
              <Form.Item>
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Ingresa tu nombre!"
                    }
                  ]
                })(
                  <Input
                    name="name"
                    onChange={this.onChange}
                    placeholder="Ingresa tu nombre..."
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "Ingresa un correo electrónico válido..."
                    },
                    {
                      required: true,
                      message: "Ingresa un correo electrónico válido!"
                    }
                  ]
                })(
                  <Input
                    name="email"
                    onChange={this.onChange}
                    placeholder="Ingresa un correo electrónico válido..."
                  />
                )}
              </Form.Item>
              <Form.Item hasFeedback>
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
                })(<Input.Password placeholder="Ingresa una contraseña..." />)}
              </Form.Item>
              <Form.Item hasFeedback>
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
                    onChange={this.onChange}
                    placeholder="Confirma contraseña..."
                    onBlur={this.handleConfirmBlur}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("phone", {
                  rules: [
                    {
                      required: true,
                      message: "Ingresa un número de celular!"
                    }
                    // {
                    //   type: "Number",
                    //   message: "Debe ser un número!"
                    // }
                  ]
                })(
                  <Input
                    name="phone"
                    onChange={this.onChange}
                    placeholder="Ingresa un número de celular..."
                    addonBefore={"+51"}
                    style={{ width: "100%" }}
                  />
                )}
              </Form.Item>
              <Form.Item
              // {...tailFormItemLayout}
              >
                <div className="button" style={{ textAlign: "center" }}>
                  <Button type="primary" htmlType="submit">
                    Registrar
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedRegister = Form.create({ name: "register" })(Register);

const mapStateToProps = (state, props) => ({
  user: state.firebase.auth.uid
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(WrappedRegister);
