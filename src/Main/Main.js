import React, {Component} from 'react';
import 'antd/dist/antd.css';
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
import NoLoginContainer from "../Container/NoLoginContainer";
import MusicContainer from "../Container/MusicContainer";
import DecodeContainer from "../Container/DecodeContainer";
import Error from "../Error/Error"
import {isMobileOrPc,scaleScreen} from "../Utils/Utils";
import {Button, Modal} from "antd";

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            userInfo:"",
            visible : true
        };


    }

    handleCancelIntro = () => {
        this.setState({
            visible : false
        })
    };

    componentDidMount() {
        const isMobile = isMobileOrPc();

        if(isMobile) {
            document.querySelectorAll(".right-container")[0].setAttribute("style", "display:none");
            document.querySelectorAll(".left-container")[0].setAttribute("style", "min-width: -webkit-fill-available;");
        }
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
                            <Route path="/noLogin">
                                <NoLoginContainer />
                            </Route>
                            <Route path="/music">
                                <MusicContainer />
                            </Route>
                            <Route path="/decode">
                                <DecodeContainer />
                            </Route>
                            <Route path="/test">
                                <TestComponent />
                            </Route>
                            <Route render={() => <Error />}/>
                        </Switch>
                    </Router>
                </div>
                <div id="footer">
                    <Foot />
                </div>

                {/*<Modal*/}
                {/*    title="阿凡达博客导言"*/}
                {/*    visible={this.state.visible}*/}
                {/*    onCancel={this.handleCancelIntro}*/}
                {/*    footer={[*/}
                {/*        <Button key="back" htmlType="submit" type="primary"  onClick={this.handleCancelIntro}>*/}
                {/*            好的*/}
                {/*        </Button>,*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <span>本博客属于beta测试版，并不对外人开放</span>*/}
                {/*    <br/>*/}
                {/*    <span>若出现bug，请联系管理员</span>*/}
                {/*    <br/>*/}
                {/*</Modal>*/}
            </div>
        )
    }
}

window.onload = () =>{

};


const adjustNav = () => {
    const head = document.querySelector("#header");
    if(window.scrollY > head.offsetTop){
        head.classList.add("fixed-nav");
    }else{
        head.classList.remove("fixed-nav");
    }
};

window.addEventListener("scroll",adjustNav);

export default Main;
