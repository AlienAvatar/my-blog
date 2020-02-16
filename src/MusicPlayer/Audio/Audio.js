import React from 'react';
import {Row, Col, Button} from 'antd';
import ReactPlayer from "react-player";

class Audio extends React.Component {

    render() {
        return(
            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
        )
    }
}

export default Audio;