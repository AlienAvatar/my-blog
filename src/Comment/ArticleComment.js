import {Comment, Tooltip, List, Typography, Input,Avatar } from 'antd';
import moment from 'moment';
import React, { Component } from 'react'
import "./style.css";
import {local} from "../Constant/loginConstant";

const { Title,Text} = Typography;
const { TextArea } = Input;
const ExampleComment = ({ children }) => (
    <Comment
        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
        author={<a>Han Solo</a>}
        avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
        }
        content={
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
            </p>
        }
    >
        {children}
    </Comment>
);

class ArticleComment extends Component {
    constructor(props){
        super(props);
        this.state = {items : {}};
        this.getArticleComment = this.getArticleComment.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const {aritcleId} = nextProps;
        this.getArticleComment(aritcleId)
    }
    componentDidMount() {
        const {aritcleId} = this.props;
    }

    getArticleComment(aritcleId){

        if(aritcleId === undefined){
            return;
        }
        const url = "http://localhost:8081/api/queryComment?aritcleId="+ aritcleId;
        fetch(url,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then((result) => {
            console.log(result);
            this.setState({items:result.data});
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    render() {
        return(
            <div className="article-comment shadow-container">
                <ExampleComment>
                    <ExampleComment>
                        <ExampleComment />
                        <ExampleComment />
                    </ExampleComment>
                </ExampleComment>
            </div>
        )
    }
}

export default ArticleComment;
