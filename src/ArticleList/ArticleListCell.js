import React, { Component } from 'react'
import './style.css'
import {Divider,Icon} from "antd";
import { Typography } from 'antd';

const { Title,Paragraph  } = Typography;
class ArticleListCell extends Component{
    constructor(props){
        super(props);
        this.openArticle = this.openArticle.bind(this);
    }

    openArticle(){
        let item = this.props.data;
        const hostname = window.location.hostname;
        const port = window.location.port;
        window.location.href = `http://${hostname}:${port}/articleDetail?id=${item.pkid}`;
    }

    render() {
        let item = this.props.data;
        let index = this.props.index;
        let createDate = item.createDate.toString().substr(0,10);

        const cellId = `cell-detail-content-${index}`;
        return(
            <div className="cell-container" onClick={this.openArticle}>
                <div className="cell-title">
                    <Divider orientation="left" className="cell-title-content"><Title level={1}>{item.title}</Title></Divider>
                </div>
                <div className="cell-content">
                    <Paragraph className="cell-content-text" id={cellId} ellipsis>{item.content}</Paragraph>
                </div>
                <Divider className="cell-foot-line"/>
                <div className="cell-foot">
                    <div className="cell-foot-group">
                        <span><a href="#" className="cell-foot-item cell-comment"><Icon className="cell-icon" type="form" />{item.commentCount}</a></span>
                        <span><a href="#" className="cell-foot-item cell-calendar"><Icon className="cell-icon" type="calendar" />{createDate}</a></span>
                        <span><a href="#" className="cell-foot-item cell-author"><Icon className="cell-icon" type="user" />{item.username}</a></span>
                        <span><a href="#" className="cell-foot-item cell-viewCount"><Icon className="cell-icon" type="eye" />{item.viewCount}</a></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArticleListCell