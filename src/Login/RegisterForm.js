import { Form, Icon, Input, Button, Checkbox,Select, AutoComplete,Option,AutoCompleteOption,Cascader,Tooltip,Row,Col } from 'antd';
import React, {Component} from 'react';
import "./style.css"

const url = 'http://111.229.76.149:8081/api/getUser';
class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }

        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="login" className="login" style={loginStyle}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <a href="#" className="closeLoginWindow" onClick={this.props.closeLoginWindow}>X</a>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="register"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const loginStyle = {
    display : 'flex',
    position : 'fixed',
    justifyContent : 'center',
    alignItems : 'center'
};

export default RegisterForm;