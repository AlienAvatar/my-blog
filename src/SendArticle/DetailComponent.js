import React, { Component } from 'react'
import {Form, Icon, Typography,Layout} from "antd";
import ArticleComment from "../Comment/ArticleComment";
import SendComment from "../Comment/SendComment";
import {local} from "../Constant/loginConstant";
import Divider from "antd/lib/divider";
import $ from  'jquery'

const { Title,Text} = Typography;

const PKID = "pkid=";

class DetailComponent extends Component {
    constructor(props){
        super(props);
        this.getArticleDetail = this.getArticleDetail.bind(this);
        this.state = {
            item: null,
            detailContent:null
        }
    }

    componentDidMount(){
        this.getArticleDetail();
    }

    componentDidUpdate(){
        let detailElement = document.getElementById("detail-content");

        if(detailElement !== null){
            detailElement.innerHTML = this.state.detailContent;
        }
    }

    getArticleDetail(){
        const id = getQueryVariable("id");
        const url = `${local.url}/queryArticleDetail?${PKID}${id}`;
        fetch(url,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then((result) => {
            console.log(result);
            this.setState({
                item:result.data[0],
                detailContent:result.data[0].content,
            });
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    render() {
        let {item,detailContent} = this.state;
        if(!item){
            return null;
        }
        let createDate = item.createDate.toString().substring(0,10);
        const SendCommentForm = Form.create({ name: 'send_comment' })(SendComment);
        // if(item.content !== null) {
        //     const content = document.getElementById("detail-content").innerHTML = item.content;
        // }
        return(
            <div className="send-article-container">
                <div className="about-article">
                    <div className="about-container shadow-container">
                        <div className="about-title">{item.title}</div>
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
                        <div id="detail-content" className="about-content">
                            {/*{detailContent}*/}
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


function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
export default DetailComponent;