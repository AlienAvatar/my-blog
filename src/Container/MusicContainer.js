import React, {Component,Fragment} from 'react';
import "./style.css";
import ReactPlayer from 'react-player';
import MusicPlayer from "../MusicPlayer/MusicPlayer"

class MusicContainer extends Component{
    render() {
        const ref = React.createRef();
        return(
            <Fragment>
                <MusicPlayer />
            </Fragment>
        )
    }
}

export default MusicContainer;