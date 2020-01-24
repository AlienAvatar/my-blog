import React, { Component,Fragment } from 'react';
import {APPID,APPSECRET} from "../Constant/WeatherConstant";

const weatherURL = `https://www.tianqiapi.com/api/?appid=${APPID}&appsecret=${APPSECRET}`;
class WeatherComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }



    render() {
        return(
            <Fragment>

            </Fragment>
        )
    }
}

export default WeatherComponent;