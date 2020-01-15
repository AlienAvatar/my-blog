import React, { Component } from 'react'
import "./style.css";
import "../index.css";
import {Icon,Typography,Input } from "antd";
import {local} from "../Constant/loginConstant";
import Divider from "antd/lib/divider";
// import img from "../../public/image/avatar.jpg"

const { Title,Text} = Typography;
const item = {
    commentCount : 1,
    createDate: new Date().toLocaleDateString(),
    viewCount : 1,
    username : '阿凡达达人'
};

class AboutMe extends Component{
    constructor(props){
        super(props);
        this.state = {
            item : null
        };
        this.getAboutMeArticle = this.getAboutMeArticle.bind(this);
    }

    componentWillMount(){
        this.getAboutMeArticle();
    }

    getAboutMeArticle(){
        fetch(local.url,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then((result) => {
            console.log(result);
            this.setState({item:result.data});
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    render() {
        // let item = this.state.item;
        // console.log(item);
        // if(item){
        //     return null;
        // }
        return(
            <div className="about-article">
                <div className="about-container shadow-container">
                    <div className="about-title">关于我</div>
                    <div className="about-cell">
                        <div className="about-cell-group">
                            <span><a href="#" className="cell-foot-item cell-comment"><Icon className="cell-icon" type="form" />{item.commentCount}</a></span>
                            <span><a href="#" className="cell-foot-item cell-calendar"><Icon className="cell-icon" type="calendar" />{item.createDate}</a></span>
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
                        <Text>767808421@qq.com</Text>
                    </div>
                </div>

                <div className="comment-container shadow-container">
                    <div className="comment-content">
                        <Input placeholder="Basic usage" />
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutMe;