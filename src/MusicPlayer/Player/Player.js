import React from 'react';
import {Row, Col, Button,Icon} from 'antd';
import ReactPlayer from "react-player";

class Player extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        return(
            <Row type="flex">
                <Col span={1}>
                    <Button
                        shape='circle'
                    >
                        <Icon type="step-backward" />
                    </Button>
                </Col>
                <Col span={1}>
                    <Button
                        shape='circle'

                    >
                        <Icon type="caret-right" />
                    </Button>
                </Col>
                <Col span={1}>
                    <Button
                        shape='circle'

                    >
                        <Icon type="step-forward" />
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default Player;