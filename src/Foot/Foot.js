import React, {Component, Fragment} from 'react';
import "./style.css";
import {Footer, Layout, Menu,Divider,Icon} from "antd";
class Foot extends Component{
    render() {
        return (
            <div className="footer">
                <div className="footer-header">
                    <div className="footer-banner">
                        <a href="#" className="term-item">联系我们</a>
                        <a href="#" className="term-item">帮助与反馈</a>
                        <a href="#" className="last-term-item">服务条款</a>
                    </div>
                    <span>好好学习，努力投身于社会主义建设，早日实现伟大复兴中国梦</span>
                    <Divider />
                    <span>Avatar Design ©2018 Created by Avatar dxf</span>
                </div>
                <div className="footer-msg">
                    <div className="btn-group">
                        <Icon style={{ fontSize: '30px'}} type="message" />
                    </div>
                </div>
            </div>
        )
    }
}



export default Foot;