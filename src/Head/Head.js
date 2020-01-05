import React, {Component, Fragment} from 'react';
import {Form, Layout, Menu} from "antd";
import logoImage from "../../public/Image/avatar.jpg";
import { Button } from 'antd';
import LoginForm from  "../Login/LoginForm";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const shadowWindow = 'position: fixed; top:0;right:0;bottom:0;left:0;background: rgba(0,0,0,0)';

class Head extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){
        let isShowLogin = !this.props.isShowLogin;
        this.props.showLogin(isShowLogin);
    }

    render() {

        return (
            <div id="header">
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
                            <Button onClick={this.handleChange} className="head-btn" type="primary">登录</Button>
                        </div>
                    </Header>

                </Layout>
            </div>
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



export default Head;