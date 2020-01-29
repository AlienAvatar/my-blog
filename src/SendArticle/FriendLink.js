import React, { Component } from 'react'
import {Button, Form, Icon, Input, Typography} from "antd";
import ArticleComment from "../Comment/ArticleComment";
import SendComment from "../Comment/SendComment";
import {local} from "../Constant/loginConstant";
import Divider from "antd/lib/divider";

const { Title,Text,Paragraph} = Typography;
const PKID = "pkid=";
class FriendLink extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: null
        };
        this.getFriendLinkArticle = this.getFriendLinkArticle.bind(this);
    }

    componentWillMount(){
        this.getFriendLinkArticle();
    }

    getFriendLinkArticle(){
        const id = 1;
        const url = `${local.url}/queryArticleDetail?${PKID}${id}`;
        fetch(url,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then((result) => {
            this.setState({item:result.data[0]});
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    render() {
        let item = this.state.item;
        if(!item){
            return null;
        }
        let createDate = item.createDate.toString().substring(0,10);
        const SendCommentForm = Form.create({ name: 'send_comment' })(SendComment);
        return(
            <div className="send-article-container">
                <div className="about-article">
                    <div className="send-container shadow-container">
                        <span> <Title level={3}>友情链接</Title></span>
                        <Divider />
                        <div className="about-cell">
                            <div className="about-cell-group">
                                <span><a href="#" className="cell-foot-item cell-comment"><Icon className="cell-icon" type="form" />{item.commentCount}</a></span>
                                <span><a href="#" className="cell-foot-item cell-calendar"><Icon className="cell-icon" type="calendar" />{createDate}</a></span>
                                <span><a href="#" className="cell-foot-item cell-author"><Icon className="cell-icon" type="user" />{item.username}</a></span>
                                <span><a href="#" className="cell-foot-item cell-viewCount"><Icon className="cell-icon" type="eye" />{item.viewCount}</a></span>
                            </div>
                        </div>
                        <Divider />
                        <Text>友人A</Text>
                        <br/>
                        <div className="friend-link-content">
                            <Text>Chow 哥:</Text>
                            <Paragraph>赛轮赛斯特格洛斯特村村霸，工作狂人，牛逼</Paragraph>
                        </div>

                        <Text>友人B</Text>
                        <br/>
                        <div className="friend-link-content">
                            <Text>浩神:</Text>
                            <Paragraph>师兄，腾讯大佬，就没发现他不懂的技术，业内最佩服的人</Paragraph>
                        </div>

                        <Text>友人C</Text>
                        <br/>
                        <div className="friend-link-content">
                            <Text>张大大:</Text>
                            <Paragraph>师姐，能文能武，朋友圈实力派偶像</Paragraph>
                        </div>
                    </div>

                    <ArticleComment aritcleId={item.pkid}/>
                    <div className="comment-container shadow-container">
                        <div className="comment-content">
                            <Title level={3}>发表评论</Title>
                            <SendCommentForm aritcleId={item.pkid} commentCount={item.commentCount}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FriendLink;