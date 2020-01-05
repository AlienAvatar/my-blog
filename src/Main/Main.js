import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb, Ico, Form} from 'antd';
import Head from '../Head/Head';
import LoginForm from "../Login/LoginForm";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const shadowWindow = 'position: fixed; top:0;right:0;bottom:0;left:0;background: rgba(0,0,0,0)';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowLogin: false
        };
        this.showLogin = this.showLogin.bind(this);
    }

    showLogin(isShowLogin){
        this.setState({
            isShowLogin:isShowLogin
        });
        document.body.style.cssText = shadowWindow;
    }

    render() {
        let isShowLogin = this.state.isShowLogin;
        const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
        return(
            <div id="container">
                <Head className="header" showLogin={this.showLogin} isShowLogin={this.state.isShowLogin}></Head>
                {isShowLogin ? <WrappedNormalLoginForm ></WrappedNormalLoginForm> : null}
            </div>
        )
    }
}

export default Main;
