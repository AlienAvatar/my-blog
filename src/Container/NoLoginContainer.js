import React, {Component} from 'react';
import "./style.css";
import Text from "antd/lib/typography/Text";


class NoLoginContainer extends Component{
    render() {
        return(
            <div className="no-login-container">
                <Text>请你先登录</Text>
            </div>
        )
    }
}


export default NoLoginContainer;