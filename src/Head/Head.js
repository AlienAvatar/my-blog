import React, {Component, Fragment} from 'react';
import {Form, Layout, Menu} from "antd";
import { Button } from 'antd';
import LoginForm from  "../Login/LoginForm";
import "./style.css";
import RegisterForm from "../Login/RegisterForm";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const css_ShadowWindow = 'position: fixed; top:0;right:0;bottom:0;left:0;background: rgba(0,0,0,0.8)';
const css_closeLoginWindow = 'position: fixed; top:0;right:0;bottom:0;left:0;background: rgba(0,0,0,0)';

class Head extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowLogin : "closed",
            loginMsg : {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.closeLoginWindow = this.closeLoginWindow.bind(this);
        this.succeedLoginWindow = this.succeedLoginWindow.bind(this);
        this.logout = this.logout.bind(this);
        this.openRegisterWindow = this.openRegisterWindow.bind(this);
    }

    logout(){
        this.setState({
            isShowLogin : 'closed',
            loginMsg : {}
        });
        document.querySelector(".head-btn").style.cssText = "display:block";
    }

    closeLoginWindow(){
        this.setState({
            isShowLogin : 'closed'
        });
        // document.getElementsByClassName("headOverlay")[0].style.cssText = "display:none";
    }

    succeedLoginWindow(msg){
        this.setState({
            isShowLogin : 'loginIn',
            loginMsg:msg
        });
        document.querySelector(".head-btn").style.cssText = "display:none";
    }

    handleChange(){
        this.setState({
            isShowLogin : 'login'
        });
        // document.getElementsByClassName("headOverlay")[0].style.cssText = "display:block";
    }


    openRegisterWindow(){
        this.setState({
            isShowLogin : 'register'
        });
    }

    componentDidUpdate(){

    }

    render() {
        let isShowLogin = this.state.isShowLogin;
        const NormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
        const NormalRegisterForm = Form.create({ name: 'normal_register' })(RegisterForm);
        let loginFormComponent= null;
        let loginInMsgComponent = null;

        if(isShowLogin === "login" ){
            loginFormComponent = <NormalLoginForm closeLoginWindow={this.closeLoginWindow} succeedLoginWindow={this.succeedLoginWindow} isShowLogin={isShowLogin} openRegisterWindow={this.openRegisterWindow} ></NormalLoginForm>
        }else if(isShowLogin === "register"){
            loginFormComponent = <NormalRegisterForm closeLoginWindow={this.closeLoginWindow} isShowLogin={this.state.isShowLogin}></NormalRegisterForm>
        }
        if(isShowLogin === "loginIn"){
            console.log(this.state.loginMsg);
            let nickname = this.state.loginMsg.nickname;
            loginInMsgComponent = <Menu.SubMenu title={nickname}><Menu.Item>设置</Menu.Item><Menu.Item onClick={this.logout}>退出</Menu.Item></Menu.SubMenu>
        }
        return (
            <div className="header">
                <div className="headOverlay">
                </div>
                {loginFormComponent}
                <Layout>
                    <div className="header-container">
                        <div className="bannerLine" style={css_bannerLine} />
                        <Header className="banner">
                            <div className="left-banner">
                                <a href="#" className="logo"/>
                                <div className="container" style={css_container}>
                                    <Menu
                                        theme="dark"
                                        mode="horizontal"
                                        defaultSelectedKeys={['2']}
                                        style={{ lineHeight: '64px' }}
                                    >
                                            <Menu.SubMenu title="菜单"><Menu.Item>子菜单项1</Menu.Item><Menu.Item>子菜单项2</Menu.Item></Menu.SubMenu>
                                            <Menu.SubMenu title="菜单2"><Menu.Item>子菜单项1</Menu.Item><Menu.Item>子菜单项2</Menu.Item></Menu.SubMenu>
                                            <Menu.SubMenu title="菜单3"><Menu.Item>子菜单项1</Menu.Item><Menu.Item>子菜单项2</Menu.Item></Menu.SubMenu>
                                    </Menu>
                                </div>
                            </div>
                            <div className="right-banner">
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    defaultSelectedKeys={['2']}
                                    style={{ lineHeight: '64px' }}
                                >
                                    {loginInMsgComponent}
                                </Menu>
                                <Button onClick={this.handleChange} className="head-btn" type="primary">登录</Button>
                            </div>

                        </Header>
                    </div>
                </Layout>
            </div>
        )
    }
}

const css_bannerLine = {
    borderLeft:'202px solid #666',
    height:'4px',
    background: "#1890ff",
};

const css_headOverlay = {
    position:'fixed',
    left:0,
    top:0,
    width:'100%',
    height: '100%'
};

const css_container ={
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
};

// const css_logo ={
//     backgroundImage: "../../public/image/avatar.jpg"
// };

export default Head;