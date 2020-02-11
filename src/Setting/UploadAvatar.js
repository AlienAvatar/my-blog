import React, { Component,Fragment } from 'react'
import {Upload, Icon, message, Button, Layout} from 'antd';
import {local} from "../Constant/loginConstant";
import {AvatarArr} from "../Constant/SettingConstant";
import $ from  'jquery';
import Divider from "antd/lib/divider";

const { Header, Content, Footer, Sider } = Layout;
const uploadURL = `${local.url}/public/image`;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const props = {
    name: 'file',
    action: "http://localhost:8080/",
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class UploadAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.handleHover = this.handleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }



    handleHover(){
        debugger;
        $(".setting-avatar-content").addClass("avatar-active");
    }

    handleClick(){
        console.log(1);
        // event.target.style.border = ""
    }
    render() {
        const items = AvatarArr;
        const {title} = this.props;
        return(
            <Content style={{ padding: '0 24px', minHeight: 1152 }}>
                <Header style={{backgroundColor:'#fff'}}>{title}</Header>
                <Divider/>
                <div className = "setting-avatar-container">
                    <div className="setting-avatar-body">
                        {
                            items.map((item,index) => {
                                return(
                                    <div className="setting-avatar-content" key={index} onClick={this.handleClick}>
                                        <img onMouseOver={()=>this.handleHover} className="setting-avatar-img" src={item} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="setting-avatar-footer">
                        <Button type="primary">更改头像</Button>
                    </div>
                </div>
            </Content>
        )
    }
}

export default UploadAvatar;