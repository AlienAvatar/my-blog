import React, {Component, Fragment} from 'react';
import {Form, Layout, Menu} from "antd";
import logoImage from "../../public/Image/avatar.jpg";
import { Button } from 'antd';
import LoginForm from  "../Login/LoginForm";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Head extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowLogin: false
        };
        this.showLogin = this.showLogin.bind(this);
    }

    showLogin(){
        let temp = !this.state.isShowLogin;
        this.setState({
            isShowLogin:temp
        });

        // document.body.cssText = shadowWindow;
    }

    render() {
        let isShowLogin = this.state.isShowLogin;
        const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
        return (
            <Layout>
                <div className="bannerLine" style={bannerLine} />
                <Header className="header">
                    <div className="logo" style={logo}/>
                    <div className="container" style={container}>
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
                        <Button onClick={this.showLogin} className="head-btn" type="primary">登录</Button>
                    </div>
                </Header>
                {isShowLogin ? <WrappedNormalLoginForm></WrappedNormalLoginForm> : null}
            </Layout>
        )
    }
}

const bannerLine = {
    borderLeft:'150px solid #666',
    height:'4px',
    background: "#1890ff",
};

const logo = {
    // background: "url(../../public/Image/avatar.jpg)",
    // backgroundColor:"blue"
};

const container ={
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
};

const shadowWindow = {
    position: "fixed",
    top:"0",
    right:"0",
    bottom:"0",
    left:"0",
    background: "rgba(0,0,0,.8)"
};

export default Head;