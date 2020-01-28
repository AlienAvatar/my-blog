import { Form, Icon, Input, Button,message} from 'antd';
import React, { Component } from 'react'
import "./style.css";
import Setting from "./Setting";
import Text from "antd/lib/typography/Text";
import Divider from "antd/lib/divider";
import {local} from "../Constant/loginConstant"
const MODIFY_URL = `${local.url}/modifyUserInfo`;
const NICKNAME = "nickname=";
const EMAIL= "email=";
const PKID = "pkid=";
const QUERY_URL = `${local.url}/getUserByPkid`;

class PersonSettingForm extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            loginMsg: null
        };
        this.openMsgHint = this.openMsgHint.bind(this);
        this.queryUserInfo = this.queryUserInfo.bind(this);
    }

    componentWillMount() {
        let userInfo = window.sessionStorage.userInfo;
        if(userInfo !== null && userInfo !== undefined && userInfo !== "null") {
            this.setState({
                loginMsg: JSON.parse(userInfo),
            });
        }
    }

    componentDidMount() {
        const {loginMsg} = this.state;
        if(loginMsg === null){
            return;
        }
        this.props.form.setFields({
            nickname: {
                value: loginMsg.nickname
            },
            email:{
                value: loginMsg.email
            },
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }
            const {loginMsg} = this.state;
            const url = `${MODIFY_URL}?${NICKNAME}${values.nickname}&${EMAIL}${values.email}&${PKID}${loginMsg.pkid}`;
            fetch(url,{
                method: "POST",
                mode: 'cors',
            }).then(res => {
                return res.json();
            }).then(json => {
                console.log('获取结果', json);
                this.openMsgHint(json);
                return json;
            }).catch(err => {
                console.log('请求错误', err);
            });
        });
    };

    openMsgHint(json){
        if(json.code === 200){
            message.success(json.msg);
            this.queryUserInfo();
        }else{
            message.error(json.msg)
        }
    }

    queryUserInfo(){
        const {loginMsg} = this.state;
        const url = `${QUERY_URL}?${PKID}${loginMsg.pkid}`;
        console.log(url);
        fetch(url,{
            method: "GET",
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({loginMsg:json.msg[0]});
            window.sessionStorage.userInfo = JSON.stringify(json.msg[0]);
            window.location.reload();
            return json.msg[0];
        }).catch(err => {
            console.log('请求错误', err);
        });
    }
    render() {
        const {loginMsg} = this.state;
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    <Text className="personal-text">昵称:</Text>
                    {getFieldDecorator('nickname', {
                        rules: [
                            {
                                required: true,
                                message: '请输入昵称',
                            },
                        ],
                    })(<Input style={{width: "30%",minWidth:"100px"}}/>)}
                </Form.Item>
                <Form.Item>
                    <Text>电子邮箱:</Text>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '请输入正确的电子邮箱！',
                            },
                            {
                                required: true,
                                message: '请输入电子邮箱',
                            },
                        ],
                    })(<Input style={{width: "30%",minWidth:"100px"}}/>)}
                </Form.Item>
                <Text>用户名:</Text>
                <Text>{loginMsg.username}</Text>
                <Divider/>
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
                {/*Or <a href=""  onClick={this.openRegister}>注册</a>*/}
            </Form>
        );
    }
}

export default PersonSettingForm;