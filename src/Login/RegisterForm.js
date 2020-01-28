import { Form, Icon, Input, Button, Tooltip,Row,Col } from 'antd';
import React, {Component} from 'react';
import "./style.css"
import {local} from "../Constant/loginConstant"

const addUserUrl = `${local.url}/addUser`;
const username = "username=";
const password = "password=";
const nickname = "nickname=";
const email = "email=";

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
        this.checkRegister = this.checkRegister.bind(this);
    }

    checkRegister(msg){
        this.props.RegisterConfirmWindow(msg);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }
            const usernameParam = `${username}${values.username}`;
            const nicknameParam = `${nickname}${values.nickname}`;
            const passwordParam = `${password}${values.password}`;
            const emailParam = `${email}${values.email}`;
            const url = `${addUserUrl}?${usernameParam}&${nicknameParam}&${passwordParam}&${emailParam}`;
            fetch(url,{
                method: 'POST',
                mode: "cors",
            }).then(res => {
                return res.json();
            }).then(json => {
                console.log('获取的结果', json);
                this.checkRegister(json);
                return json;
            }).catch(err => {
                console.log('请求错误', err);
            })
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="login" className="login" style={loginStyle}>
                <div className="login-container">
                    <div className="close-login">
                        <a href="#" onClick={this.props.closeLoginWindow}>X</a>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{padding : "40px 45px"}}>
                        <Form.Item
                            label={
                                <span>用户名&nbsp;
                                    <Tooltip title="作为你的登录用户">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                            }
                        >
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                                    label={
                                        <span>昵称&nbsp;
                                            <Tooltip title="What do you want others to call you?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                     }
                        >
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="密码" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        validator: this.validateToNextPassword,
                                    },
                                ],
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item label="验证密码" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                        </Form.Item>
                        <Form.Item label="E-mail">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item className="login-form-button">
                            <Button type="primary" htmlType="submit" >
                                确认
                            </Button>
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

export default RegisterForm;