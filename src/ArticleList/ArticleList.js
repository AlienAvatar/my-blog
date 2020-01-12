import React, { Component } from 'react'
import ArticleListCell from './ArticleListCell'
import "./style.css";
import Pagination from "antd/es/pagination";
import { Input,Tabs } from 'antd';
const { Search } = Input;
const { TabPane } = Tabs;
const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:null,
            arr:null,
            result:null,
            current: 1,
            pageSize:0
        };
        this.getArticle = this.getArticle.bind(this);
    }

    onChange = page => {
        let items = this.getArticle(page);
        if(!items){
            return null;
        }
        this.setState({
            current: page,
            items : items,
        });
    };

    componentDidMount() {
        this.getPageSize();
        this.getArticle(this.state.current);
    }

    getPageSize(){
        fetch('http://localhost:8081/api/getPageSize',{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then((result) => {
            this.setState({pageSize:result.msg});
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    getArticle(page){
        fetch('http://localhost:8081/api/getArticle?page='+page,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then((result) => {
            this.setState({items:result});
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    render() {
        const items = this.state.items;
        if(!items){
            return null;
        }
        return(
            <div className="left-article">
                <div className="input-container">
                    <Search
                        style={{ width: 500 }}
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={value => console.log(value)}
                    />
                </div>
                {
                    items.map((item,index) => (
                        <div className="article-container">
                            <ArticleListCell key={index} data={item} />
                        </div>
                    ))
                }

                <div className="article-page">
                    <Pagination defaultCurrent={this.state.current} onChange={this.onChange} pageSize={5} total={this.state.pageSize} />
                </div>
            </div>
        )
    }
}

export default ArticleList