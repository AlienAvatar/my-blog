import React from "react";
import {Button, Col, Icon, Row, Typography,Slider,Layout} from "antd";
import Player from "./Player/Player";
import ReactPlayer from "react-player";
import {RepeatOnce,Shuffle,AllRepeat} from "../Constant/MusicConstant";
import Duration from  "./Duration";
import {MusicList} from "./Config/MusicList";
import Lyric from "./Lyric/Lyric";
import "./style.css";

const {Text} = Typography;
const {Footer, Content} = Layout;

class MusicPlayer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url:"https://raw.githubusercontent.com/Shurlormes/Resource/master/Music/yydt.mp3",
            volume: 0.8,
            playing: false,
            played: 0,
            duration: 0,
            currentTime: 0,
            muted:false,
            playType:1,
        }
    }

    ref = player => {
        this.player = player
    }

    handleVolumeChange = e => {
        this.setState({ volume: e})
    };

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    };

    handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    };

    handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    };

    handleSeekMouseDown = e => {
        this.setState({ seeking: true })
    }

    handleSeekChange = e => {
        this.setState({ played: e })
    }

    handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(e)
    }

    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    };

    handleDuration = (duration) => {
        console.log('onDuration', duration);
        this.setState({ duration })
    };

    handlePlayType = (e) =>{
        console.log(e.target.value);
        let valuePlay = e.target.value;
        if(valuePlay < 3){
            valuePlay++;
        }else{
            valuePlay = 1;
        }
        this.setState({
            playType:valuePlay
        })
    };

    render() {
        const {url,volume,playing,played,muted,duration,playType} = this.state;
        let btnPlayType;
        if(playType === RepeatOnce){
            btnPlayType = <Button type="primary" value={1} onClick={this.handlePlayType}>单次循环</Button>
        }else if(playType === Shuffle){
            btnPlayType = <Button type="primary" value={2} onClick={this.handlePlayType}>循环播放</Button>
        }else{
            btnPlayType = <Button type="primary" value={3} onClick={this.handlePlayType}>重复播放</Button>
        }

        const items = MusicList;
        return(
            <div className="music-container">
                <Layout>
                    <Content>
                        {
                            items.map(item =>{
                                return (
                                    <div key={item.id} className='show-component'>
                                        <div>
                                            <Row justify='center' type='flex'>
                                                <Col className='music-cover music-cover-vertical'>
                                                    <img src={item.cover}/>
                                                </Col>
                                            </Row>
                                            <Row justify='center' type='flex' className='text-center'>
                                                <Col className='music-info music-info-vertical'>
                                                    <h1>{item.title}</h1>
                                                    <h2>{item.singer}</h2>
                                                </Col>
                                            </Row>
                                            <Row justify='center' type='flex' className='text-center'>
                                                <Col className='music-lyric music-lyric-vertical'>
                                                    <Lyric lyric={item.lyric} currentTime={duration * played} />
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Content>
                    <Footer>
                        <ReactPlayer
                            url="https://raw.githubusercontent.com/Shurlormes/Resource/master/Music/yydt.mp3"
                            volume={volume}
                            playing={playing}
                            onPlay={this.handlePlay}
                            onPause={this.handlePause}
                            onProgress={this.handleProgress}
                            ref={this.ref}
                            muted={muted}
                            onDuration={this.handleDuration}
                        />


                        <div className="music-btn-group">
                            <Row type="flex" align="top">
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
                                        onClick={this.handlePlayPause}
                                    >
                                        {playing ? <Icon type="pause" /> : <Icon type="caret-right" />}
                                    </Button>
                                </Col>
                                <Col span={1}>
                                    <Button
                                        shape='circle'

                                    >
                                        <Icon type="step-forward" />
                                    </Button>
                                </Col>
                               <Col span={1}>
                                   <Duration seconds={duration * played} />
                               </Col>
                                <Col span={6}>
                                    <Slider
                                        min={0}
                                        max={1}
                                        onMouseDown={this.handleSeekMouseDown}
                                        onChange={this.handleSeekChange}
                                        onMouseUp={this.handleSeekMouseUp}
                                        step={0.01}
                                        value={played}
                                    />
                                </Col>
                                <Col span={1}>
                                    <Duration seconds={duration} />
                                </Col>

                                <Col span={2}>
                                    <Icon type="sound" />
                                    <Slider
                                        min={0}
                                        max={1}
                                        value={volume}
                                        onChange={this.handleVolumeChange}
                                        step={0.1}
                                    />
                                </Col>

                                <Col span={1}>
                                    {btnPlayType}
                                </Col>
                                {/*<Col span={3}>*/}
                                {/*    <Icon type="redo" />*/}
                                {/*</Col>*/}

                                {/*<Col span={2}>*/}

                                {/*</Col>*/}
                            </Row>
                        </div>
                    </Footer>
                </Layout>
            </div>

        )
    }
}

export default MusicPlayer;