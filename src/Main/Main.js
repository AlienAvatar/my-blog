import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb, Ico, Form} from 'antd';
import Head from '../Head/Head';
import Foot from '../Foot/Foot';
import LoginForm from "../Login/LoginForm";
import RegisterForm from "../Login/RegisterForm";
import Container from "../Container/Container";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import "./style.css";


class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowLogin: "closed"
        };
    }

    render() {
        return(
            <div id="page">
                <div id="header">
                    <Head ></Head>
                </div>
                <div  id="container">
                    <Container ></Container>
                </div>
                <div id="footer">
                    <Foot></Foot>
                </div>
            </div>
        )
    }
}

export default Main;
