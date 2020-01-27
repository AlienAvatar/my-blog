import React, { Component } from 'react'
import {Button, Input, Typography} from "antd";
import ArticleEditor from "./ArticleEditor"
import {local} from "../Constant/loginConstant";

const { TextArea } = Input;
const { Title,Text} = Typography;

const addArticleUrl = `${local.url}/addArticle`;
const content = "content=";
class SendArticle extends Component {
    constructor(props){
        super(props);
        this.addArticle = this.addArticle.bind(this);
    }

    addArticle(e){
        let headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain'
        });
        e.preventDefault();
        let contentValue = document.getElementById("article-content").value;
        let queryUrl = `${addArticleUrl}?${content}${contentValue}`;
        fetch(queryUrl,{
            method: 'POST',
            headers: headers,
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log('获取的结果', json);
            return json;
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    render() {
        return(
            <div className="send-article-container">
                <div className="about-article">
                    <div className="send-container shadow-container">
                        <span> <Title level={3}>发表文章</Title></span>
                        {/*<TextArea id="article-content" rows={40}/>*/}
                        <ArticleEditor className="article-content"/>
                        <div className="article-button-send">
                            <Button type="primary"  htmlType="submit" className="comment-button">发送文章</Button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SendArticle;