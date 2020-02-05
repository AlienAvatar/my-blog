import React, { Component } from 'react'
import {Layout, Menu, Breadcrumb, Icon, Form, Input, Button} from "antd";
import {} from 'antd';
import "./style.css";
import PersonSettingForm from "./PersonSettingForm";
import Divider from "antd/lib/divider";
import UploadAvatar from "./UploadAvatar";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Setting extends Component {
    constructor(props){
        super(props);
        this.state ={
            key : "1",
            title : "个人资料"
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(props){
        this.setState({
            key : props.key,
            title : props.item.props.children
        })
    }

    render() {
        const PersonForm = Form.create({ name: 'normal_setting' })(PersonSettingForm);
        const {key,title} = this.state;
        let Doc = null;
        const PersonDoc = () =>{
            return(
                <Content style={{ padding: '0 24px', minHeight: 600 }}>
                    <Header style={{backgroundColor:'#fff'}}>{title}</Header>
                    <Divider/>
                    <Content>
                        <PersonForm />
                    </Content>
                </Content>
            )
        };

        const AvatarDoc = () =>{
            return (
                <Content style={{ padding: '0 24px', minHeight: 600 }}>
                    <Header style={{backgroundColor:'#fff'}}>{title}</Header>
                    <Divider/>
                    <Content>
                        <UploadAvatar />
                    </Content>
                </Content>
            )
        };

        if(key === "1"){
            Doc = <PersonDoc />;
        }else if(key === "2"){

        }else if(key === "3"){
            Doc = <AvatarDoc />
        }


        return(
            <Layout style={{display:'flex', flexDirection:'column-reverse',alignItems:'center'}}>
                <Content style={{ padding: '25px 50px',marginBottom:"30px" }}>
                    <Layout width={500} style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                                onClick={this.handleChange}
                            >
                                <SubMenu
                                    key="sub1"
                                    title={<span><Icon type="user" />个人信息</span>}
                                >
                                    <Menu.Item key="1" >个人资料</Menu.Item>
                                    <Menu.Item key="2">文章管理</Menu.Item>
                                    <Menu.Item key="3" >更改头像</Menu.Item>
                                    {/*<Menu.Item key="3">option3</Menu.Item>*/}
                                    {/*<Menu.Item key="4">option4</Menu.Item>*/}
                                </SubMenu>
                            </Menu>
                        </Sider>
                        {Doc}
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Avatar</Footer>
            </Layout>
        )
    }
}



export default Setting;