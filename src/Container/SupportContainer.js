import React, {Component, Fragment} from 'react';
import "./style.css";
import {Layout, Menu, Breadcrumb, Icon, Form, Input, Button} from "antd";
import wxImg from "../../public/image/paywx.png"
import zfbImg from "../../public/image/payzfb.jpg"
const { Header, Content, Footer, Sider } = Layout;

class AboutMeContainer extends Component{
    render() {
        return(
            <div className="container">
                <Layout>
                    <Content className="support-container">
                        <Layout className="support-left support-banner">
                        </Layout>
                        <Layout className="support-right support-banner">
                        </Layout>
                    </Content>
                    <Footer style={{textAlign:"center"}}><h3>扫描屏幕中的二维码</h3></Footer>
                </Layout>
            </div>
        )
    }
}


export default AboutMeContainer;