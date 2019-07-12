import React, { Component } from "react";
import { Button, Input, Form } from "antd";

class ProposalInputs extends Component {
  onClick = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.next();
      }
    });
  };
  render() {
    const { TextArea } = Input;
    const { handleChange } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
        <Form style={{ width: "70%", margin: "auto" }}>
          <Form.Item>
            <h3 style={{ textAlign: "center", color: "#ff6700" }}>Abreboca</h3>
            {getFieldDecorator("starter", {
              rules: [{ required: true, message: "Ingresa un abreboca!" }]
            })(
              <Input
                onChange={handleChange("starter")}
                placeholder="Ingresa un abreboca..."
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("starter_desc", {
              rules: [{ required: true, message: "Describe tu abreboca!" }]
            })(
              <TextArea
                onChange={handleChange("starter_desc")}
                placeholder="Añade una descripción del abreboca..."
              />
            )}
          </Form.Item>
          <Form.Item>
            <h3 style={{ textAlign: "center", color: "#ff6700" }}>Entrada</h3>
            {getFieldDecorator("entry", {
              rules: [{ required: true, message: "Ingresa una entrada!" }]
            })(
              <Input
                onChange={handleChange("entry")}
                placeholder="Ingresa una entrada..."
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("entry_desc", {
              rules: [{ required: true, message: "Describe tu entrada!" }]
            })(
              <TextArea
                onChange={handleChange("entry_desc")}
                placeholder="Añade una descripción de la entrada..."
              />
            )}
          </Form.Item>
          <Form.Item>
            <h3 style={{ textAlign: "center", color: "#ff6700" }}>Fondo</h3>
            {getFieldDecorator("main", {
              rules: [{ required: true, message: "Ingresa un plato de fondo!" }]
            })(
              <Input
                onChange={handleChange("main")}
                placeholder="Ingresa un plato de fondo..."
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("main_desc", {
              rules: [
                { required: true, message: "Describe tu plato de fondo!" }
              ]
            })(
              <TextArea
                onChange={handleChange("main_desc")}
                placeholder="Añade una descripción del plato de fondo..."
              />
            )}
          </Form.Item>
          <Form.Item>
            <h3 style={{ textAlign: "center", color: "#ff6700" }}>Postre</h3>
            {getFieldDecorator("dessert", {
              rules: [{ required: true, message: "Ingresa un postre!" }]
            })(
              <Input
                onChange={handleChange("dessert")}
                placeholder="Ingresa un postre..."
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("dessert_desc", {
              rules: [{ required: true, message: "Describe tu postre!" }]
            })(
              <TextArea
                onChange={handleChange("dessert_desc")}
                placeholder="Añade una descripción del postre..."
              />
            )}
          </Form.Item>
          <hr />
          <br />
          <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
            <Button type="primary" onClick={this.onClick}>
              Submit
            </Button>
          </Form.Item>
        </Form>
    );
  }
}

const WrappedProposal = Form.create({ name: "proposal_inputs" })(
  ProposalInputs
);

export { WrappedProposal };
