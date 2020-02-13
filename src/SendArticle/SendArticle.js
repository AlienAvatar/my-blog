import React, { Component } from 'react'
import {Icon, Input, Select, Typography,message} from "antd";
import {local} from "../Constant/loginConstant";
import Divider from "antd/lib/divider";
import { Layout } from 'antd';
import "./style.css";
import MyEditor from "./MyEditor";

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
            title:null,
            desc:null,
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.checkSendArticle = this.checkSendArticle.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.updateTitleAndDescription = this.updateTitleAndDescription.bind(this);
    }

    componentWillMount() {
        let userInfo = window.sessionStorage.userInfo;
        if(userInfo !== null && userInfo !== undefined && userInfo !== "null") {
            this.setState({
                loginMsg: JSON.parse(userInfo),
            });
        }else{
            const hostname = window.location.hostname;
            const port = window.location.port;
            window.location.href = `http://${hostname}:${port}/noLogin`;
        }
    }

    checkSendArticle(json){
        if(json.code === 200){
            this.setState({
                selectValue:'tech'
            });
            message.success('文章发表成功');
            const hostname = window.location.hostname;
            const port = window.location.port;
            window.location.href = `http://${hostname}:${port}`;
        }else{
            message.error('文章发表失败，请联系管理员');
        }
    }

    handleSelectChange(value){
        this.setState({
           selectValue: value
        });
    }

    changeTitle(e){
        this.setState({
            title:e.target.value
        })
    }

    changeDescription(e){
        this.setState({
            desc:e.target.value
        })
    }

    updateTitleAndDescription(title,desc,type){
        this.setState({
            title:title,
            desc:desc,
            selectValue:type
        });
        document.getElementById("send-article-title").value = title;
        document.getElementById("send-article-description").value = desc;
        document.getElementById("send-article-type").value = type;

    }

    render() {
        const {loginMsg,selectValue,title,desc} = this.state;
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
                                <Text>标题:</Text><Input onChange={this.changeTitle} id="send-article-title" style={{width:"70%",minWidth:"100px"}}/>
                            </Header>
                            <Header style={{backgroundColor:'#fff',display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <Text>描述:</Text><Input onChange={this.changeDescription} id="send-article-description" style={{width:"70%",minWidth:"100px"}}/>
                            </Header>
                            <Header className="article-select" style={{backgroundColor:'#fff'}}>
                                <Text>类型:</Text>
                                <Select id="send-article-type" defaultValue={selectValue} style={{ width: 120 }} onChange={this.handleSelectChange}>
                                    <Option value="tech">技术</Option>
                                    <Option value="tattle">杂谈</Option>
                                    <Option value="story">故事会</Option>
                                </Select>
                            </Header>
                        </Layout>
                        {/*Editor*/}
                        <MyEditor className="article-content" desc={desc} title={title} selectValue={selectValue} checkSendArticle={this.checkSendArticle} updateTitleAndDescription={this.updateTitleAndDescription}/>
                        {/*<TextArea id="article-content" rows={20}/>*/}
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