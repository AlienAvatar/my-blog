import React, { Component,Fragment } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

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