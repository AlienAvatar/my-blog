import React, { Component } from 'react'
import {Layout, Menu, Breadcrumb, Icon } from "antd";
import {} from 'antd';
import "./style.css";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Setting extends Component {
    constructor(props){
        super(props);
        this.state={
            item:{}
        }
    }

    render() {
        return(
            <Layout style={{display:'flex', flexDirection:'column-reverse',alignItems:'center'}}>
                <Content style={{ padding: '0 50px' }}>
                    <Layout width={500} style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={400} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu
                                    key="sub1"
                                    title={<span><Icon type="user" />个人信息</span>}
                                >
                                    <Menu.Item key="1">个人资料</Menu.Item>
                                    {/*<Menu.Item key="2">option2</Menu.Item>*/}
                                    {/*<Menu.Item key="3">option3</Menu.Item>*/}
                                    {/*<Menu.Item key="4">option4</Menu.Item>*/}
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 600 }}>Content</Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Avatar</Footer>
            </Layout>
        )
    }
}

export default Setting;