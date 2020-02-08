import React, { Component,Fragment } from 'react'
import RightContainer from "../Container/RightContainer";
import {Layout, Menu,Button,Icon} from "antd";
import {isMobileOrPc,openSendArticle,openSetting,openSupport,openFriendLink,openAboutMe,openMain,openGithub} from "../Utils/Utils";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class MobileHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <div style={{ width: 256 }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                </Menu>
            </div>
        )
    }
}

export default MobileHead;