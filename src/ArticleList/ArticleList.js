import React, { Component } from 'react'
import ArticleListCell from './ArticleListCell'
import "./style.css";
import Pagination from "antd/es/pagination";
import { Input } from 'antd';
import {local} from "../Constant/loginConstant"

const { Search } = Input;
const TITLE = 'title=';
const PAGE = 'page=';

const GET_ARTICLE_URL = `${local.url}/getArticle`;
const PAGE_SIZE_URL = `${local.url}/getPageSize`;
class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:null,
            arr:null,
            result:null,
            current: 1,
            pageSize:0,

        };
        this.getArticle = this.getArticle.bind(this);
        this.getPageSize = this.getPageSize.bind(this);
        this.searchArticleByTitle = this.searchArticleByTitle.bind(this);
    }

    onChange = page => {
        const valueTitle = document.getElementById("search-title").value;
        let items = null;
        if(valueTitle !== "" && valueTitle !== undefined){
             items = this.getArticle(page,valueTitle);
        }else {
            items = this.getArticle(page,"");
        }

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
        this.getArticle(this.state.current,"");
    }

    getPageSize(paramValueTitle){
        let valueTitle = "";
        if(paramValueTitle !== undefined){
            valueTitle = paramValueTitle;
        }

        const URL = `${PAGE_SIZE_URL}?${TITLE}${valueTitle}`;
        fetch(URL,{
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

     getArticle(valuePage,valueTitle){
        const URL = `${GET_ARTICLE_URL}?${PAGE}${valuePage}&${TITLE}${valueTitle}`;
        fetch(URL,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then((result) => {
            this.setState({
                items:result
            });
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    searchArticleByTitle(){

        const valueTitle = document.getElementById("search-title").value || "";
        this.getPageSize(valueTitle);
        const valuePage = this.state.current;
        const URL = `${GET_ARTICLE_URL}?${PAGE}${valuePage}&${TITLE}${valueTitle}`;
        fetch(URL,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then((result) => {
            this.setState({
                items:result,
            });
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
                        id="search-title"
                        style={{ width: 500 }}
                        placeholder="请输入要查找的标题"
                        enterButton="Search"
                        size="large"
                        onSearch={this.searchArticleByTitle}
                    />
                </div>
                {
                    items.map((item) => (
                        <div className="article-container" key={item.pkid}>
                            <ArticleListCell data={item} />
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