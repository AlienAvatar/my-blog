import React, { Component,Fragment } from 'react'
import {List, Avatar, Typography, Divider,Skeleton} from 'antd';
import {local} from "../Constant/loginConstant";
import "./style.css";
import ArticleListCell from "../ArticleList/ArticleListCell";

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
        };
        this.getData = this.getData.bind(this);
        this.addStyle = this.addStyle.bind(this);
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

    componentDidUpdate(){
        this.addStyle();
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

    addStyle(){

        // const {data} = this.state;
        // // let detailElement = document.querySelectorAll(".setting-article-content");
        // for(let i = 0; i < 4 ; i++) {
        //
        //
        //     let detailElement = document.getElementById("setting-article-"+i);
        //     if (detailElement !== null) {
        //         let contentValue = JSON.parse(data[i].content);
        //         if(contentValue.length > 20){
        //             contentValue = contentValue.substr(0,20) + "...";
        //         }
        //         let html = '<div className="cell-content-text" id="setting-article-'+i+'">'+contentValue+'</div>'
        //         detailElement.innerHTML = contentValue;
        //     }
        // }

        const {data} = this.state;
        for(let i = 0; i < 5; i++) {
            let detailElement = document.getElementById("cell-detail-content-" + i);
            if (detailElement !== null) {
                let contentValue = JSON.parse(data[i].content);
                detailElement.innerHTML = contentValue;
            }
        }
    }

    render() {
        let {data,loginMsg,current} = this.state;
        console.log(loginMsg);
        return(
            <Fragment>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    pagination={{
                        onChange: page => {
                            this.addStyle();
                        },
                        pageSize: 4,
                    }}
                    position="bottom"
                    renderItem={(item,index) => (
                        <div className="article-container" key={item.pkid}>
                            <ArticleListCell data={item} index={index}/>
                        </div>
                    )}
                />
            </Fragment>
        )
    }
}

export default ArticleSetting;