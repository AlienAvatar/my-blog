import React, { Component,Fragment } from 'react'
import {Upload, Icon, message, Button, Layout} from 'antd';
import {AvatarArr} from "../Constant/SettingConstant";
import $ from  'jquery';

const { Header, Content, Footer, Sider } = Layout;

class CommentSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.handleHover = this.handleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleHover(){
        $(".setting-avatar-content").addClass("avatar-active");
    }

    handleClick(){
        console.log(1);
    }

    render() {
        const items = AvatarArr;
        return(
            <div className = "setting-avatar-container" onClick={this.handleClick}>

            </div>
        )
    }
}

export default CommentSetting;