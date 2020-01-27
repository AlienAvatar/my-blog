import React, { Component } from 'react'
import "./style.css";
import {Form, Icon, Input, Button, Checkbox, Typography} from 'antd';
import ArticleEditor from "../SendArticle/ArticleEditor";
const { Title,Text} = Typography;
const { TextArea } = Input;

const url = "http://localhost:8081/api/addComment";
const author = "author=";
const email = "email=";
const content= "content=";
const aritcleId = "aritcleId=";
const commentCount = "commentCount=";

class SendComment extends Component {
    handleSubmit = e => {
        let headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain'
        });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }
            const aritcleIdValue = this.props.aritcleId;
            const commentCountValue = this.props.commentCount || 0;
            console.log("aritcleIdValue=" + aritcleIdValue);
            console.log("commentCountValue=" + commentCountValue);

            let queryUrl = `${url}?${author}${values.author}&${email}${values.email}&${content}${values.content}&${aritcleId}${aritcleIdValue}&${commentCount}${commentCountValue}`;
            fetch(queryUrl,{
                method: 'POST',
                headers: headers,
            }).then(res => {
                return res.json();
            }).then(json => {
                console.log('获取的结果', json);
                return json;
            }).catch(err => {
                console.log('请求错误', err);
            })
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="comment-form">
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input your content!' }],
                    })(
                        <TextArea row={3}/>
                        // <ArticleEditor />
                    )}
                </Form.Item>
                <div className="comment-input-group">
                    <Text>用户名:</Text>
                    <Form.Item style={{marginBottom:"0"}}>
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: 'Please input your author!' }],
                        })(
                            <Input className="comment-input" placeholder="author" />
                        )}
                    </Form.Item>

                    <Text>电子邮箱:</Text>
                    <Form.Item style={{marginBottom:"0"}}>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input className="comment-input" placeholder="email" />
                        )}
                    </Form.Item>

                </div>
                <Form.Item>
                    <div className="comment-button-send">
                        <Button type="primary"  htmlType="submit" className="comment-button">发送评论</Button>
                    </div>
                </Form.Item>
            </Form>
        )
    }
}

export default SendComment;