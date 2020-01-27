import { Form, Icon, Input, Button, Checkbox,Select, AutoComplete,Option,AutoCompleteOption,Cascader,Tooltip,Row,Col } from 'antd';
import React, {Component} from 'react';
import "./style.css"
import {local} from "../Constant/loginConstant"

const username = 'username=';
const password = 'password=';
const isExistUserUrl = `${local.url}/isExistUser`;

const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
});
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
            if (!err) {
                console.log('Received values of form: ', values);
            }
            const queryUrl = `${isExistUserUrl}?${username}${values.username}&${password}${values.password}`;
            fetch(queryUrl,{
                method: "POST",
                headers: headers
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