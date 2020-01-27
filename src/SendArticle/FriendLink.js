import React, { Component } from 'react'
import {Button, Form, Input, Typography} from "antd";
import ArticleComment from "../Comment/ArticleComment";
import SendComment from "../Comment/SendComment";
import {local} from "../Constant/loginConstant";

const { Title,Text} = Typography;

class FriendLink extends Component {
    constructor(props){
        super(props);
        this.state = {
            item : {}
        };
        this.getFriendLinkArticle = this.getFriendLinkArticle.bind(this);
    }

    componentWillMount(){
        this.getFriendLinkArticle();
    }

    getFriendLinkArticle(){
        fetch(local.url,{
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
        const SendCommentForm = Form.create({ name: 'normal_login' })(SendComment);
        return(
            <div className="send-article-container">
                <div className="about-article">
                    <div className="send-container shadow-container">
                        <span> <Title level={3}>友情链接</Title></span>
                        <Text>友人A</Text>
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