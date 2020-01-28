import React, { Component } from 'react'
import {Button, Icon, Input, Select, Typography,message} from "antd";
import ArticleEditor from "./ArticleEditor"
import {local} from "../Constant/loginConstant";
import Divider from "antd/lib/divider";
import { Layout } from 'antd';
import "./style.css";

const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;
const { Title,Text} = Typography;

const addArticleUrl = `${local.url}/addArticle`;
const CONTENT = "content=";
const TITLE = "title=";
const TYPE = "type=";
const USERNAME = "username=";
class SendArticle extends Component {
    constructor(props){
        super(props);

        this.state= {
            loginMsg: null,
            selectValue:"tech",
        };
        this.addArticle = this.addArticle.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.checkSendArticle = this.checkSendArticle.bind(this);
    }

    componentWillMount() {
        let userInfo = window.sessionStorage.userInfo;
        if(userInfo !== null && userInfo !== undefined && userInfo !== "null") {
            this.setState({
                loginMsg: JSON.parse(userInfo),
            });
        }
    }

    addArticle(e){
        e.preventDefault();
        let contentValue = document.getElementById("article-content").value;
        let titleValue = document.getElementById("send-article-title").value;
        if(contentValue.concat() === "" || titleValue.concat() === ""){
            message.warning('文章和标题不能为空');
            return;
        }
        const {loginMsg,selectValue} = this.state;
        let queryUrl = `${addArticleUrl}?${CONTENT}${contentValue}&${TITLE}${titleValue}&${TYPE}${selectValue}&${USERNAME}${loginMsg.username}`;
        fetch(queryUrl,{
            method: 'POST',
            mode:'cors'
        }).then(res => {
            return res.json();
        }).then(json => {
            this.checkSendArticle(json);
            return json;
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    checkSendArticle(json){
        if(json.code === 200){
            document.getElementById("article-content").value = "";
            document.getElementById("send-article-title").value = "";
            this.setState({
                selectValue:'tech'
            });
            message.success('文章发表成功');
        }else{
            message.error('文章发表失败，请联系管理员');
        }
    }

    handleSelectChange(value){
        this.setState({
           selectValue: value
        });
    }

    render() {
        const {loginMsg,selectValue} = this.state;
        let createDate = genCreateDate();
        return(
            <div className="send-article-container">
                <div className="about-article">
                    <div className="send-container shadow-container">
                        <span> <Title level={3}>发表文章</Title></span>
                        <Divider/>
                        <div className="about-cell">
                            <div className="about-cell-group">
                                <span><a href="#" className="cell-foot-item cell-comment"><Icon className="cell-icon" type="form" />{loginMsg.nickname}</a></span>
                                <span><a href="#" className="cell-foot-item cell-calendar"><Icon className="cell-icon" type="calendar" />{createDate}</a></span>
                            </div>
                        </div>
                        <Divider/>
                        <Layout>
                            <Header style={{backgroundColor:'#fff',display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <Text>标题:</Text><Input id="send-article-title" style={{width:"70%",minWidth:"100px"}}/>
                            </Header>
                            <Layout style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <Content>
                                    <TextArea id="article-content" rows={20}/>
                                </Content>
                            </Layout>
                            <Footer>
                                <Layout className="article-select">
                                {/*<div className="article-button-send">*/}
                                    <Text>类型:</Text>
                                    <Select defaultValue={selectValue} style={{ width: 120 }} onChange={this.handleSelectChange}>
                                        <Option value="tech">技术</Option>
                                        <Option value="tattle">杂谈</Option>
                                        <Option value="story">故事会</Option>
                                    </Select>
                                </Layout>
                                    <Button onClick={this.addArticle} type="primary" className="comment-button">发送文章</Button>
                                {/*</div>*/}
                            </Footer>
                        {/*<ArticleEditor className="article-content"/>*/}
                        </Layout>
                    </div>
                </div>
            </div>
        )
    }
}

function genCreateDate() {
    let day = new Date();
    day.setTime(day.getTime());
    let createDate = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
    return createDate;
}
export default SendArticle;