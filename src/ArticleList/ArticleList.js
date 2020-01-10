import React, { Component } from 'react'
import ArticleListCell from './ArticleListCell'
import "./style.css";
import Pagination from "antd/es/pagination";

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
        // console.log(items);
        if(!items){
            return null;
        }
        this.setState({
            current: page,
            items : items,
        });
    };

    // onShowSizeChange = () =>{
    //     let pageSize = this.getPageSize();
    //     console.log(pageSize);
    //     this.setState({pageSize:pageSize});
    // };
    setPageSize(pageSize){
        this.setState({pageSize:pageSize});
    }
    componentDidMount() {
        this.getPageSize();
        this.getArticle(this.state.current);
    }

    setItems(params){
        this.setState({items:params});
    }

    getPageSize(){
        fetch('http://localhost:8081/api/getPageSize',{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then((result) => {
            // console.log(result);
            this.setPageSize(result.msg);
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
            this.setItems(result);
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    render() {
        const {tags} = this.props;
        const items = this.state.items;
        if(!items){
            return null;
        }

        return(
            <div className="art-container">
                {
                    items.map((item,index) => (
                        <ArticleListCell history={this.props.history} key={index} data={item} tags={tags} />
                    ))
                }
                <Pagination defaultCurrent={this.state.current} onChange={this.onChange} pageSize={5} total={this.state.pageSize} />;
            </div>
        )
    }
}

export default ArticleList