import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Ico } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Main extends Component{
    render() {
        return(
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        )
    }
}

export default Main;
