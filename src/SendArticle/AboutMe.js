import React, { Component } from 'react'
import "./style.css";
import "../index.css";
import {Form,Icon,Typography} from "antd";
import {local} from "../Constant/loginConstant";
import Divider from "antd/lib/divider";
import SendComment from "../Comment/SendComment";
import ArticleComment from "../Comment/ArticleComment";

const { Title,Text} = Typography;

class AboutMe extends Component{
    constructor(props){
        super(props);
        this.state = {
            item : null
        };
        this.getAboutMeArticle = this.getAboutMeArticle.bind(this);
    }

    componentDidMount() {
        this.getAboutMeArticle();
    }

    getAboutMeArticle(){
        fetch(`${local.url}/getAboutMe`,{
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
            <div className="about-article">
                <div className="about-container shadow-container">
                    <div className="about-title">关于我</div>
                    <div className="about-cell">
                        <div className="about-cell-group">
                            <span><a href="#" className="cell-foot-item cell-comment"><Icon className="cell-icon" type="form" />{item.commentCount}</a></span>
                            <span><a href="#" className="cell-foot-item cell-calendar"><Icon className="cell-icon" type="calendar" />{createDate}</a></span>
                            <span><a href="#" className="cell-foot-item cell-author"><Icon className="cell-icon" type="user" />{item.username}</a></span>
                            <span><a href="#" className="cell-foot-item cell-viewCount"><Icon className="cell-icon" type="eye" />{item.viewCount}</a></span>
                        </div>
                    </div>
                    <Divider />
                    <div className="about-content">
                        <span> <Title level={3}>我是谁</Title></span>
                        <Text>我是阿凡达达人</Text>
                        <br/>
                        <Text>94年出生</Text>
                        <br/>
                        <Text>来自云南昆明，目前在深圳工作</Text>
                        <br/>
                        <Text>毕业于成都理工大学</Text>
                        <br/>
                        <Text>专业是空间信息与数字技术</Text>

                        <Divider />
                        <Title level={3}>关于这个博客</Title>
                        <Text>学习经验</Text>
                        <br/>
                        <Text>个人见解</Text>

                        <Divider />
                        <Title level={3}>技能强度</Title>
                        <Text className="about-content-skill">根据颜色深度表示:</Text>
                        <Text className="about-content-skill" type="secondary">入门</Text>
                        <Text className="about-content-skill" type="warning">掌握</Text>
                        <Text className="about-content-skill" type="danger">熟练</Text>
                        <br/>
                        <Text type="warning">html/css/js</Text>
                        <br/>
                        <Text type="warning">java</Text>
                        <br/>
                        <Text type="warning">React</Text>
                        <br/>
                        <Text type="warning">mysql</Text>
                        <br/>
                        <Text type="warning">node.js</Text>
                        <br/>
                        <Text type="warning">webpack</Text>
                        <br/>
                        <Text type="secondary">c</Text>
                        <br/>
                        <Divider />

                        <Title level={3}>如何联系我</Title>
                        <Text>767808421<Icon type="dribbble-square" />qq.com</Text>
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
        )
    }
}

export default AboutMe;