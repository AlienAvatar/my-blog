import React, { Component,Fragment } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const dailyURL = `https://api.ooopn.com/ciba/api.php?type=json`;

class DailySentenceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ciba:null,
            imgurl:null,
        };
        this.getDailySentenceData = this.getDailySentenceData.bind(this);
    }

    componentDidMount() {
        this.getDailySentenceData();
    }

    getDailySentenceData(){
        fetch(dailyURL,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                ciba:json.ciba,
                imgurl:json.imgurl,
            });
            return json;
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    render() {
        return(
            <Fragment>
                <Text>{this.state.ciba}</Text>
                <br/>
            </Fragment>
        )
    }
}

export default DailySentenceComponent;