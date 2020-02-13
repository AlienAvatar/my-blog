import React, {Component, Fragment} from 'react';
import "./style.css";
import {Divider,Icon,BackTop,Form,message, Button,Input,Modal,Affix } from "antd";
import {contactMe,param} from "../Constant/FootConstant";
import {local} from "../Constant/loginConstant"


class Foot extends Component{
    constructor(props){
        super(props);
        this.state = {
            bottom: 10,
            visible: false,
            confirmLoading:false,
            visibleFeed:false
        };
        this.showService = this.showService.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showFeedBack = this.showFeedBack.bind(this);
        this.handleCancelFeedBack = this.handleCancelFeedBack.bind(this);
    }

    showService(){
        this.setState({
            visible: true,
        });
    }

    handleCancel(){
        this.setState({
            visible: false,
        });
    }

    showFeedBack(){
        this.setState({
            visibleFeed: true,
        });
    }

    handleCancelFeedBack(){
        this.setState({
            visibleFeed: false,
        });
    }

    render() {
        const { visible, confirmLoading, visibleFeed } = this.state;
        const Feedback = Form.create({ name: 'foot_feedback' })(FeedbackForm);
        return (
            <div className="footer">
                <div className="footer-header">
                    <div className="footer-banner">
                        <a href="#" className="term-item" onClick={contactMe}>联系我们</a>
                        <a href="#" className="term-item" onClick={this.showFeedBack}>帮助与反馈</a>
                        <a href="#" className="last-term-item" onClick={this.showService}>服务条款</a>
                    </div>
                    <span>好好学习，努力投身于社会主义建设，早日实现伟大复兴中国梦</span>
                    <Divider />
                    <span>Avatar Design ©2020 Created by Avatar dxf</span>
                </div>
                <div className="footer-msg">
                    <div className="btn-group">
                        {/*<Affix className="btn-msg" offsetBottom={this.state.bottom}>*/}
                        {/*    <Icon*/}
                        {/*        style={{ fontSize: '30px'}} type="message"*/}
                        {/*        onClick={() => {*/}
                        {/*            this.setState({*/}
                        {/*                bottom: this.state.bottom + 10,*/}
                        {/*            });*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*    </Icon>*/}
                        {/*</Affix>*/}
                        <div className="back-top">
                            <BackTop visibilityHeight={400}/>
                        </div>
                    </div>

                    <Modal
                        title="阿凡达服务条款"
                        visible={visible}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" htmlType="submit" type="primary"  onClick={this.handleCancel}>
                                好的
                            </Button>,
                        ]}
                    >
                        <span>您必须遵守服务中提供的所有政策。</span>
                        <br/>
                        <span>请勿滥用我们的服务。举例而言，请勿干扰我们的服务或尝试使用除我们提供的界面和指示以外的方法访问这些服务。您仅能在法律（包括适用的出口和再出口管制法律和法规）允许的范围内使用我们的服务。如果您不遵守我们的条款或政策，或者我们在调查可疑的不当行为，我们可以暂停或停止向您提供服务。</span>
                        <br/>
                        <span>使用我们的服务并不让您拥有我们的服务或您所访问的内容的任何知识产权。除非您获得相关内容所有者的许可或通过其他方式获得法律的许可，否则您不得使用服务中的任何内容。本条款并未授予您使用我们服务中所用的任何商标或标志的权利。请勿删除、隐藏或更改我们服务上显示的或随服务一同显示的任何法律声明。</span>
                        <br/>
                    </Modal>

                    <Modal
                        title="阿凡达帮助与反馈"
                        visible={visibleFeed}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancelFeedBack}
                        footer={null}
                    >
                        如需帮助，请<a href="#" onClick={contactMe}>联系我们</a>
                        <Feedback />
                    </Modal>
                </div>
            </div>
        )
    }
}

class FeedbackForm extends Component {
    handleSubmitFeed = (e) =>{

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
            }
            const valueContactType = values.contactType;
            const valueFeedback = values.feedback;
            const URL = `${local.url}/addFeedback${param.CONTACTTYPE}${valueContactType}&${param.FEEDBACKTEXT}${valueFeedback}`;
            fetch(URL,{
                method: 'POST',
                mode: 'cors',
            }).then(res => {
                return res.json();
            }).then((result) => {
                if(result.code === 200){
                    message.success("谢谢你的提议");

                    return;
                }else{
                    message.error("提议失败，请联系管理员");
                    return;
                }
            }).catch(err => {
                console.log('请求错误', err);
            })
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label="意见反馈">
                    {getFieldDecorator('feedback', {
                        rules: [
                            {
                                required: true,
                                message: '请留下您的意见',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="联系我们">
                    {getFieldDecorator('contactType', {
                        rules: [
                            {
                                required: true,
                                message: '请留下您的联系方式',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item className="foot-feed-btn" >
                    <Button style={{margin:"0",}} type="primary" htmlType="submit" onClick={this.handleSubmitFeed}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Foot;