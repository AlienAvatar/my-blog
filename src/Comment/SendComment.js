import React, { Component } from 'react'
import "./style.css";
import {Form, Icon, Input, Button, Checkbox, Typography, message} from 'antd';
import ArticleEditor from "../SendArticle/ArticleEditor";
import {local} from "../Constant/loginConstant";

const { Title,Text} = Typography;
const { TextArea } = Input;

const url = `${local.url}/addComment`;
const author = "author=";
const email = "email=";
const content= "content=";
const aritcleId = "aritcleId=";
const commentCount = "commentCount=";

class SendComment extends Component {
    constructor(props){
        super(props);
        this.checkSendArticle = this.checkSendArticle.bind(this);
    }

    checkSendArticle(json){
        if(json.code === 200){
            document.getElementById("send_comment_content").value = "";
            document.getElementById("send_comment_author").value = "";
            document.getElementById("send_comment_email").value = "";
            message.success('评论成功');
            window.location.reload();
        }else{
            message.error('文章评论失败，好好反省下自己');
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }
            const aritcleIdValue = this.props.aritcleId;
            const commentCountValue = 0;
            console.log("aritcleIdValue=" + aritcleIdValue);
            console.log("commentCountValue=" + commentCountValue);

            let queryUrl = `${url}?${author}${values.author}&${email}${values.email}&${content}${values.content}&${aritcleId}${aritcleIdValue}&${commentCount}${commentCountValue}`;
            fetch(queryUrl,{
                method: 'POST',
                mode: 'cors',
            }).then(res => {
                return res.json();
            }).then(json => {
                this.checkSendArticle(json);
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
                            <Input className="comment-input" placeholder="请输入你的名字" />
                        )}
                    </Form.Item>

                    <Text>电子邮箱:</Text>
                    <Form.Item style={{marginBottom:"0"}}>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: '请输入有效的Email！',
                                },
                                {
                                    required: true,
                                    message: '请输入Email！',
                                },
                            ],
                        })(
                            <Input className="comment-input" placeholder="请输入email" />
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