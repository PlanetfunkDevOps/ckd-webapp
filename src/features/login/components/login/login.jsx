import React, { Component } from 'react';
import { Form, Select, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import './login.scss';

const { Option } = Select;

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  constructor(props) {
    super(props);
    sessionStorage.clear();
  }

  static propTypes = {
    firebase: PropTypes.object.isRequired
  };

  handleSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => alert('Invalid login credentials'));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const backGround = {
      height: '100vh',
      backgroundImage:
        "url('http://lavinyagrill.com/wp-content/uploads/2015/06/iStock_000046272610_Large.jpg')",
      backgroundRepeat: 'noRepeat',
      backgroundSize: 'cover'
    };
    return (
      <React.Fragment>
        <div
          style={backGround}
          className='view view-login d-flex fd-column jc-center h-100vh'
        >
          <div className='view__inner'>
            <div className='text-center'>
              <h1 className='c-white mb-20'>Login</h1>
            </div>
            <Form
              className='d-flex fd-column jc-center'
              wrapperCol={{ offset: 7, span: 10 }}
              onSubmit={this.handleSubmit}
            >
              <Form.Item>
                {getFieldDecorator('user', {
                  rules: [
                    { required: true, message: 'Por favor ingresa tu correo!' }
                  ]
                })(
                  <Input
                    name='email'
                    onChange={this.onChange}
                    placeholder='Ingresar Correo'
                    autoComplete='off'
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingresa tu password!'
                    }
                  ]
                })(
                  <Input
                    name='password'
                    type='password'
                    onChange={this.onChange}
                    placeholder='Ingresar Password'
                  />
                )}
              </Form.Item>
              {/* <Form.Item>
                {getFieldDecorator("type", {
                  rules: [
                    { required: true, message: "Please select your type!" }
                  ]
                })(
                  <Select
                    placeholder="Seleccione el tipo de usuario"
                    onChange={this.handleSelectChange}
                  >
                    <Option value="user">User</Option>
                    <Option value="cheff">Cheff</Option>
                  </Select>
                )}
              </Form.Item> */}
              <Form.Item>
                <Button type='primary' htmlType='submit' block>
                  Ingresar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedLogin = Form.create({ name: 'coordinated' })(Login);

export default firebaseConnect()(WrappedLogin);
