import React, { Component,Fragment } from 'react'
import {List, Avatar, Typography, Divider, Skeleton, Layout} from 'antd';
import {local} from "../Constant/loginConstant";
import "./style.css";
import ArticleListCell from "../ArticleList/ArticleListCell";

const { Header, Content, Footer, Sider } = Layout;
const QUERY_URL = `${local.url}/getArticleByUserName`;
const USERNAME = "username=";
const PAGE = "page=";
const { Title,Text,Paragraph} = Typography;

class ArticleSetting extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loginMsg: null,
            current: 1,
            pageSize: 3,
            initLoading: true,
            loading: false,
            list: [],
            hasMore: true,
        };
        this.getData = this.getData.bind(this);
        this.articleDetail = this.articleDetail.bind(this);
        this.modifyContent = this.modifyContent.bind(this);
    }

    componentWillMount() {
        let userInfo = window.sessionStorage.userInfo;
        if(userInfo !== null && userInfo !== undefined && userInfo !== "null") {
            this.setState({
                loginMsg: JSON.parse(userInfo),
            });
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData(){
        const {loginMsg,current} = this.state;

        const usernameValue = loginMsg.username;
        const url = `${QUERY_URL}?${USERNAME}${usernameValue}&${PAGE}${current}`;
        fetch(url,{
            method: "GET",
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log('获取结果', json);
            this.setState({
                data:json,
                initLoading: false,
                list:json,
                pageSize:json.length
            });
            return json;
        }).catch(err => {
            console.log('请求错误', err);
        });
    }

    articleDetail(e){
        let {data} = this.state;
        let id = Number(e.target.id.split("-")[2]);
        const pkid = data[id].pkid;
        const hostname = window.location.hostname;
        const port = window.location.port;
        if(pkid === undefined){
            return;
        }
        window.location.href = `http://${hostname}:${port}/articleDetail?id=${pkid}`;
    }

    modifyContent(e){
        let {data} = this.state;
        let id = Number(e.target.id.split("-")[2]);
        const pkid = data[id].pkid;
        const hostname = window.location.hostname;
        const port = window.location.port;
        if(pkid === undefined){
            return;
        }
        window.location.href = `http://${hostname}:${port}/sendArticle?id=${pkid}`;
    }

    render() {
        let {data,loginMsg,current} = this.state;
        let {title} = this.props;
        return(
            <Fragment>
                <Content style={{ padding: '0 24px', minHeight: 1152 }}>
                    <Header style={{backgroundColor:'#fff'}}>{title}</Header>
                    <Divider/>
                <List
                    className="setting-article-list"
                    itemLayout="horizontal"
                    dataSource={data}
                    pagination={{
                        onChange: page => {
                            this.addStyle();
                        },
                        pageSize: 3,
                    }}
                    position="bottom"
                    grid={data}
                    renderItem={(item,index) => (

                        <div className="setting-article" key={item.pkid}>
                            <List.Item
                                actions={[<a id={"list-detail-" + index} key="list-detail" onClick={(e)=>this.articleDetail(e)}>文章详情</a>, <a id={"list-modify-" + index} key="list-modify" onClick={(e)=>this.modifyContent(e)}>更改</a>]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description={item.descrption}
                                    />
                                    <Divider />
                                </Skeleton>
                            </List.Item>
                        </div>
                    )}
                />
                </Content>
            </Fragment>
        )
    }
}

export default ArticleSetting;