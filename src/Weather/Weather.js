import React, { Component,Fragment } from 'react';
import {APPID,APPSECRET,fetchWeatherData} from "../Constant/WeatherConstant";
import { Typography } from 'antd';

const { Text } = Typography;

const weatherURL = `https://www.tianqiapi.com/api/?appid=${APPID}&appsecret=${APPSECRET}`;
let headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
});

class WeatherComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city:null,
            country:null,
            weather:null,
        };
        this.getWeatherData = this.getWeatherData.bind(this);
    }

    componentDidMount() {
        this.getWeatherData();
    }

    getWeatherData(){
        fetch(weatherURL,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                city:json.city,
                country:json.country,
                weather:json.data[0]
            });
            return json;
        }).catch(err => {
            console.log('请求错误', err);
        })
    }



    render() {
        const weather = this.state.weather;
        return(
            <Fragment>
                <Text>国家:{this.state.country}</Text>
                <br/>
                <Text>城市:{this.state.city}</Text>
                <br/>
                {weather === null ? null : <Text>日期:{weather.date}</Text>}
                <br/>
                {weather === null ? null : <Text>星期:{weather.week}</Text>}
                <br/>
                {weather === null ? null : <Text>天气:{weather.wea}</Text>}
                {/*<Text>星期:{this.state.weather.week}</Text>*/}
                {/*<Text>天气:{weather.wea}</Text>*/}

                {/*{*/}
                {/*    weather.map((wea) => {*/}
                {/*        return(*/}
                {/*            <Fragment>*/}
                {/*                <Text>日期:{wea.date}</Text>*/}
                {/*                <Text>星期:{wea.week}</Text>*/}
                {/*                <Text>天气:{wea.wea}</Text>*/}
                {/*            </Fragment>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}

            </Fragment>
        )
    }
}

export default WeatherComponent;