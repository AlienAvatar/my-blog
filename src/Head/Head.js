import React, {Component, Fragment} from 'react';
import {Avatar, Form, Layout, Menu,Icon} from "antd";
import { Button,notification,Tooltip } from 'antd';
import LoginForm from  "../Login/LoginForm";
import "./style.css";
import RegisterForm from "../Login/RegisterForm";
import {openLoginNotificationWithIcon} from "../Constant/loginConstant"
import {isMobileOrPc,openSendArticle,openSetting,openSupport,openFriendLink,openAboutMe,openMain,openGithub} from "../Utils/Utils";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
notification.config({
    placement: 'topRight',
    top:60,
    duration: 3,
});

const avatar = <Tooltip placement="bottom" title="玩游戏就是要赢！">
    <Avatar
    src="https://overwatch.nosdn.127.net/1/images/heroes/dva/icon-portrait.png"
    alt="Dva"
/></Tooltip>;

class Head extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowLogin : "closed",
            loginMsg : {},
            isMobile : false,
            collapsed: false,
        };
        this.openLoginWindow = this.openLoginWindow.bind(this);
        this.closeLoginWindow = this.closeLoginWindow.bind(this);
        this.LoginInLoginWindow = this.LoginInLoginWindow.bind(this);
        this.logout = this.logout.bind(this);
        this.openRegisterWindow = this.openRegisterWindow.bind(this);
        this.RegisterConfirmWindow = this.RegisterConfirmWindow.bind(this);
        this.keepLoginMsgInfo = this.keepLoginMsgInfo.bind(this);
    }

    componentWillMount() {
        let isMobile = isMobileOrPc();
        this.setState({
            isMobile : isMobile
        })
    }

    componentDidMount() {
        this.keepLoginMsgInfo();
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    keepLoginMsgInfo() {
        let userInfo = window.sessionStorage.userInfo;
        if(userInfo !== null && userInfo !== undefined && userInfo !== "null") {
            this.setState({
                loginMsg: JSON.parse(userInfo),
                isShowLogin:'loginIn'
            });
        }
    }

    logout(){
        this.setState({
            isShowLogin : 'closed',
            loginMsg : {}
        });
        window.sessionStorage.userInfo = null;
    }

    closeLoginWindow(){
        this.setState({
            isShowLogin : 'closed'
        });
        document.getElementsByClassName("headOverlay")[0].style.cssText = "display:none";
    }

    LoginInLoginWindow(msg){
        if(msg.code === 200){
            this.setState({
                isShowLogin : 'loginIn',
                loginMsg:msg.data[0]
            });
            window.sessionStorage.userInfo = JSON.stringify(msg.data[0]);
            openLoginNotificationWithIcon("success","登录成功","欢迎光临");
            document.getElementsByClassName("headOverlay")[0].style.cssText = "display:none";
            return;
        }else if(msg.code === 1003){
            this.setState({
                isShowLogin : 'closed',
                loginMsg:{}
            });
            openLoginNotificationWithIcon("error","登录失败","用户名或密码错误");
        }else if(msg.code === 1001){
            this.setState({
                isShowLogin : 'closed',
                loginMsg:{}
            });
            openLoginNotificationWithIcon("error","登录失败","用户名不能为空");
        }else if(msg.code === 1002){
            this.setState({
                isShowLogin : 'closed',
                loginMsg:{}
            });
            openLoginNotificationWithIcon("error","登录失败","密码不能为空");
        }
        window.sessionStorage.userInfo = null;
        document.getElementsByClassName("headOverlay")[0].style.cssText = "display:none";
    }

    RegisterConfirmWindow(msg){
        if(msg.code === 200){
            this.setState({
                isShowLogin : 'closed',
            });
            openLoginNotificationWithIcon("success","注册成功","现在可以登录");
        }else{
            this.setState({
                isShowLogin : 'closed',
            });
            openLoginNotificationWithIcon("error","注册失败","请联系管理员");
        }
        document.getElementsByClassName("headOverlay")[0].style.cssText = "display:none";
    }
    openLoginWindow(){
        this.setState({
            isShowLogin : 'login'
        });
        document.getElementsByClassName("headOverlay")[0].style.cssText = "display:block";
    }


    openRegisterWindow(){
        this.setState({
            isShowLogin : 'register'
        });
        document.getElementsByClassName("headOverlay")[0].style.cssText = "display:block";
    }

    render() {
        let {isShowLogin,isMobile} = this.state;
        const NormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
        const NormalRegisterForm = Form.create({ name: 'normal_register' })(RegisterForm);
        let loginFormComponent= null;
        let loginInMsgComponent = null;
        if(isShowLogin === "login" ){
            loginFormComponent = <NormalLoginForm closeLoginWindow={this.closeLoginWindow} isShowLogin={isShowLogin} LoginInLoginWindow={this.LoginInLoginWindow}></NormalLoginForm>
        }else if(isShowLogin === "register"){
            loginFormComponent = <NormalRegisterForm closeLoginWindow={this.closeLoginWindow} isShowLogin={isShowLogin} RegisterConfirmWindow={this.RegisterConfirmWindow}></NormalRegisterForm>
        } else if(isShowLogin === "loginIn"){
            const {loginMsg } = this.state;
            loginInMsgComponent = <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    defaultSelectedKeys={['2']}
                                    style={{ lineHeight: '64px' }}
                                    >
                                    <Menu.SubMenu title={avatar}></Menu.SubMenu>
                                    <Menu.SubMenu title={loginMsg.nickname}><Menu.Item onClick={openSendArticle}>发表文章</Menu.Item><Menu.Item onClick={openSetting}>设置</Menu.Item><Menu.Item onClick={this.logout}>退出</Menu.Item></Menu.SubMenu>
                                  </Menu>
        }

        const MobileComponent = () => {
            return(
                <div className="right-banner">
                    <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>

                    {/*{isShowLogin === "loginIn" ?  null : <Button onClick={this.openLoginWindow} className="head-btn" type="primary">登录</Button>}*/}
                    {/*<Button type="link" onClick={this.openRegisterWindow} className="head-btn">注册</Button>*/}
                </div>
            )};


        const PCComponent = () => {
                return(
                    <div className="right-banner">
                        {loginInMsgComponent}
                        {isShowLogin === "loginIn" ? null :
                            <Button onClick={this.openLoginWindow} className="head-btn" type="primary">登录</Button>}
                        <Button type="link" onClick={this.openRegisterWindow} className="head-btn">注册</Button>
                    </div>
                )};

        let RightLoginCompoent = <PCComponent/>;
        // 可以做个可扩展按钮的伸缩
        // if(isMobile){
        //     RightLoginCompoent = <MobileComponent />
        // }else{
        //     RightLoginCompoent = <PCComponent/>
        // }
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
                                <div className="left-header-container" style={css_container}>
                                    <a href="#" onClick={openMain} className="logo"/>
                                    <Menu
                                        theme="dark"
                                        mode="horizontal"
                                        defaultSelectedKeys={['2']}
                                        style={{ lineHeight: '64px' }}
                                    >
                                            <Menu.SubMenu title="菜单">
                                                <Menu.Item onClick={openSupport}>支持</Menu.Item>
                                                {/*<Menu.Item>随笔</Menu.Item>*/}
                                            </Menu.SubMenu>
                                            <Menu.SubMenu title="友情链接" onTitleClick={openFriendLink}>{null}</Menu.SubMenu>
                                            <Menu.SubMenu title="关于我">
                                                <Menu.Item onClick={openAboutMe}>我的介绍</Menu.Item>
                                                <Menu.Item onClick={openGithub}>GitHub</Menu.Item>
                                            </Menu.SubMenu>
                                    </Menu>
                                </div>
                            </div>
                            {RightLoginCompoent}
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

const css_container ={
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
};

export default Head;