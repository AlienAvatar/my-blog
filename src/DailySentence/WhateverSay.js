import React, { Component,Fragment } from 'react';
import {APPID,APPSECRET,fetchWeatherData} from "../Constant/WeatherConstant";
import { Typography } from 'antd';

const { Text } = Typography;

const dailyURL = `https://api.ooopn.com/ciba/api.php?type=json`;

class WhateverSay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fragment>
                <Text>匆匆</Text>
                <br/>
            </Fragment>
        )
    }
}

export default WhateverSay;