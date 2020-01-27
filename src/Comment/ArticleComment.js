import {Comment, Tooltip, List, Typography, Input,Avatar,Icon } from 'antd';
import moment from 'moment';
import React, {Component, Fragment} from 'react'
import "./style.css";
import {local} from "../Constant/loginConstant";

class ArticleComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            items : null,
            likes: 0,
            dislikes: 0,
            action: null,
        };
        this.getArticleComment = this.getArticleComment.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const {aritcleId} = nextProps;
        this.getArticleComment(aritcleId)
    }

    componentDidMount() {
        const {aritcleId} = this.props;
        this.getArticleComment(aritcleId);
    }

    getArticleComment(aritcleId){
        if(aritcleId === undefined){
            return;
        }

        const url = local.url + "/queryComment?aritcleId="+ aritcleId;
        console.log(url);
        fetch(url,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then((result) => {
            this.setState({items:result.data});
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    };

    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    };

    render() {
        const { likes, dislikes, action,items} = this.state;
        if(!items){
            return null;
        }

        const actions = [

            <span key="comment-basic-reply-to"></span>,
        ];

        return(
            <Fragment>
            {
                items.map((item,index) => (
                    <div className="article-comment shadow-container" key={index}>
                        <Comment
                            actions={actions}
                            author={<a>{item.author}</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <p>
                                    {item.content}
                                </p>
                            }
                            datetime={
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment().fromNow()}</span>
                                </Tooltip>
                            }
                        />
                    </div>
                ))
            }
            </Fragment>
        )
    }
}

export default ArticleComment;
