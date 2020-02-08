import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb, Ico, Form} from 'antd';
import Head from '../Head/Head';
import Foot from '../Foot/Foot';
import Container from "../Container/Container";
import "./style.css";
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import AboutMeContainer from "../Container/AboutMeContainer";
import ArticleContainer from "../Container/ArticleContainer";
import FriendLinkContainer from "../Container/FriendLinkContainer";
import TestComponent from "../TestCompoent/TestComponent";
import ArticleDetailContainer from "../Container/ArticleDetailContainer";
import SettingContainer from "../Container/SettingContainer";
import SupportContainer from "../Container/SupportContainer";
import MobileHead from "../Mobile/MobileHead";
import {isMobileOrPc,scaleScreen} from "../Utils/Utils";

const { SubMenu } = Menu;
const { Header, Content, Sider , Link} = Layout;

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            userInfo:""
        };
    }

    componentDidMount() {
        // List list = (List)session.getAttribute("userInfo");
        // let userInfo = window.sessionStorage.userInfo;
        // this.setState({
        //     userInfo:userInfo
        // });

    }

    render() {
        scaleScreen();
        return(
            <div id="page">
                <div id="header">
                    <Head/>
                </div>
                <div  id="container">
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <Container />
                            </Route>
                            <Route path="/aboutMe">
                                <AboutMeContainer />
                            </Route>
                            <Route path="/sendArticle">
                                <ArticleContainer />
                            </Route>
                            <Route path="/friendLink">
                                <FriendLinkContainer />
                            </Route>
                            <Route path="/articleDetail" children={<ArticleDetailContainer />}>
                            </Route>
                            <Route path="/setting">
                                <SettingContainer />
                            </Route>
                            <Route path="/support">
                                <SupportContainer />
                            </Route>
                            <Route path="/test">
                                <TestComponent />
                            </Route>
                        </Switch>
                    </Router>
                </div>
                <div id="footer">
                    <Foot />
                </div>
            </div>
        )
    }
}

window.onload = () =>{
    const isMobile = isMobileOrPc();

    if(isMobile) {
        document.querySelectorAll(".right-container")[0].setAttribute("style", "display:none");
        document.querySelectorAll(".left-container")[0].setAttribute("style", "min-width: -webkit-fill-available;");
    }
};

export default Main;
