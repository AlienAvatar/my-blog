import { Form, Icon, Input, Button, Checkbox,Select, AutoComplete,Option,AutoCompleteOption,Cascader,Tooltip,Row,Col } from 'antd';
import React, {Component} from 'react';
import "./style.css"
import RegisterForm from "./RegisterForm";
import Head from "../Head/Head";

const url = 'http://localhost:8081/api/queryUser';
const username = 'username=';
const password = 'password=';
class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.openRegisterWindow = this.openRegisterWindow.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
    }

    checkLogin(result){
        console.log(result);
        if(result.code === "200"){
            this.props.closeLoginWindow();
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        let headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain'
        });

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            let queryUrl = `${url}?${username}${values.username}&${password}${values.password}`;
            fetch(queryUrl,{
                method: 'POST',
                headers: headers,
                })
                .then(res => {
                    return res.json();
                }).then(json => {
                    console.log('获取的结果', json);
                    return json;
                }).catch(err => {
                    console.log('请求错误', err);
                })
        });
    };

    openRegisterWindow(isShowLogin){
        isShowLogin = "register";
        this.props.showLogin(isShowLogin);
    }



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
                        Or <a href=""  onClick={this.openRegisterWindow}>注册</a>
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

export default LoginForm