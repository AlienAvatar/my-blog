import { Form, Icon, Input, Button, Checkbox} from 'antd';
import React, {Component} from 'react';
import "./style.css"
import {local} from "../Constant/loginConstant"
import {thatgirl} from "../Constant/loginConstant"
import MD5 from 'crypto-js/md5';
const USERNAME = 'username=';
const PASSWORD = 'password=';
const isExistUserUrl = `${local.url}/isExistUser`;

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.checkLogin = this.checkLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkLogin(result){
        this.props.LoginInLoginWindow(result);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }

            const password = MD5(MD5(values.password+thatgirl)).toString();

            const queryUrl = `${isExistUserUrl}?${USERNAME}${values.username}&${PASSWORD}${password}`;
            fetch(queryUrl,{
                method: "POST",
                mode: 'cors',
            }).then(res => {
                return res.json();
            }).then(json => {
                console.log('获取结果', json);
                this.checkLogin(json);
                return json;
            }).catch(err => {
                console.log('请求错误', err);
            });
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="login" className="login" style={loginStyle}>
                <div className="login-container">
                    <div className="close-login">
                        <a href="#" onClick={this.props.closeLoginWindow}>X</a>
                    </div>
                    <Form onSubmit={this.handleSubmit}  style={{padding : "41px 48px"}}>

                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
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
                            {/*Or <a href=""  onClick={this.openRegister}>注册</a>*/}
                        </Form.Item>
                    </Form>
                </div>
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

export default LoginForm