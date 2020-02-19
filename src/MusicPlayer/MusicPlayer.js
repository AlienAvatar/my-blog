import React from "react";
import {Button, Col, Icon, Row, Typography,Slider,Layout,List,Table,Tooltip,Popover} from "antd";
import Player from "./Player/Player";
import ReactPlayer from "react-player";
import {RepeatOnce,Shuffle,AllRepeat,columns,shuffle} from "../Constant/MusicConstant";
import Duration from  "./Duration";
import {MusicList} from "./Config/MusicList";
import Lyric from "./Lyric/Lyric";
import "./style.css";

const {Text,Title } = Typography;
const {Header,Footer, Content} = Layout;

const data = [];

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
            selectedRowKeys: [],
            index:0,
            seeking:true,
        }
    }

    ref = player => {
        this.player = player
    };

    componentWillMount() {
        const {playing} = this.state;
        let playIcon;
        if(playing){
            playIcon = <Icon onClick={(e)=>this.onClickPlay(e)} className="play-inactive" width="1em" height="1em" type="play-circle" />
        }else {
            playIcon = <Icon onClick={(e)=>this.onClickPause(e)} className="play-inactive" width="1em" height="1em" type="pause-circle" />
        }
        for (let i = 0; i < MusicList.length; i++) {
            data.push({
                key: MusicList[i].id,
                song: MusicList[i].title,
                singer: MusicList[i].singer,
                duration: MusicList[i].duration,
                play:<Icon onClick={(e)=>this.onClickPlay(e)} className="play-inactive" width="1em" height="1em" type="play-circle" />,
            });
        }
    }

    //格式化时间
    tipFormatter(value) {
        let min = Math.floor(value / 60);
        let sec = Math.floor(value % 60);

        min = min > 9 ? min : `0${min}`;
        sec = sec > 9 ? sec : `0${sec}`;

        return `${min}:${sec}`;
    }

    //上一首 或 下一首
    handlePervious = (operator) =>{
        let {index} = this.state;
        index = Number(index) + operator;
        if(index < 0) {
            index = MusicList.length - 1
        }

        if(index > MusicList.length - 1) {
            index = 0
        }
        this.setState({
            index:index
        })
    };

    handleEnded = () => {
        const {playType} = this.state;
        if(playType === 2){
            this.handlePervious(1);
            this.setState({
                currentTime:0,
                playing:true
            })
        }else if(playType === 3){
            let randomIndex = Math.floor((Math.random()*data.length));
            this.setState({
                index:randomIndex,
                currentTime:0,
                playing:true
            })
        }
    };

    handleVolumeChange = e => {
        this.setState({ volume: e})
    };

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    };

    handlePlay = () => {
        console.log('onPlay');
        this.setState({
            playing: true
        })
    };

    handlePause = () => {
        console.log('onPause');
        this.setState({ playing: false })
    };

    handleSeekMouseDown = e => {
        this.setState({ seeking: true })
    };

    handleSeekChange = e => {
        this.player.seekTo(e);

        this.setState({
            currentTime: this.player.getCurrentTime()
        })
    };

    handleSeekMouseUp = e => {
        this.setState({ seeking: false });
    };

    handleProgress = state => {
        console.log('onProgress', state);
        const {player} = this.player;

        this.setState({
            currentTime:player.getCurrentTime()
        })

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

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    onClickPlay = (e) =>{
        this.setState({
            index:e.currentTarget.parentElement.parentElement.dataset.rowKey,
            playing: true,
            currentTime:0,
        })
    };

    onClickPause = (e) =>{
        this.setState({
            playing: false
        })
    };

    doubleClickPlay = (e) =>{
        this.setState({
            index:e.currentTarget.dataset.rowKey,
            playing: true,
            currentTime:0,
        })
    };

    showOnPlay = (e) =>{
        const len = e.currentTarget.cells.length-1;
        e.currentTarget.cells[len].children[0].classList.remove("play-inactive");
        e.currentTarget.cells[len].children[0].classList.add("play-active");
    };

    hideOnPlay = (e) =>{
        const len = e.currentTarget.cells.length-1;
        e.currentTarget.cells[len].children[0].classList.remove("play-active");
        e.currentTarget.cells[len].children[0].classList.add("play-inactive");
    };

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    render() {
        const {url,volume,playing,played,muted,duration,playType, loading, selectedRowKeys,index,currentTime} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        let btnPlayType;
        if(playType === RepeatOnce){
            btnPlayType = <Button type="primary" value={1} onClick={this.handlePlayType}>单次循环</Button>
        }else if(playType === Shuffle){
            btnPlayType = <Button type="primary" value={2} onClick={this.handlePlayType}>循环播放</Button>
        }else{
            btnPlayType = <Button type="primary" value={3} onClick={this.handlePlayType}>随机播放</Button>
        }

        const volumeContent = (
            <Slider
                min={0}
                max={1}
                value={volume}
                onChange={this.handleVolumeChange}
                step={0.1}
            />
        );

        const items = MusicList;
        const item = items[index];
        return(
            <div className="music-container">
                <div style={{backgroundImage:'url('+item.cover+')'}} className="music-headOverlay"></div>
                <Layout id="music-container">
                    <Header className="music-title" style={{maxWidth:930,color:"rgba(0, 0, 0, 0.85)",backgroundColor:"hsla(0,0%,100%,.3)",zIndex:999}}>
                        <Title>阿凡达的音乐播放器</Title>
                    </Header>
                    <Layout className="music-player-container">
                        <Layout className="music-list-container">
                            {/*<Header style={{backgroundColor:"#f0f2f5"}} className="music-list-header"><Title level={3}>播放列表</Title></Header>*/}
                            <Content >
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                                        Reload
                                    </Button>
                                    <span style={{ marginLeft: 8 }}>
                                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                                    </span>
                                </div>
                                <Table
                                    onRow={record => {
                                        return {
                                            onClick: event => {}, // 点击行
                                            onDoubleClick: event => {this.doubleClickPlay(event)},
                                            onContextMenu: event => {},
                                            onMouseEnter: event => {this.showOnPlay(event)}, // 鼠标移入行
                                            onMouseLeave: event => {this.hideOnPlay(event)},
                                        };
                                    }}
                                    rowSelection={rowSelection}
                                    columns={columns}
                                    dataSource={data}
                                />
                            </Content>
                        </Layout>
                        <Content className="music-song-msg">
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
                                            <Lyric lyric={item.lyric} currentTime={currentTime} />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Content>
                    </Layout>
                    <Footer className="music-audio-container" style={{marginTop:48}}>
                        <ReactPlayer
                            className="music-audio"
                            width={0}
                            height={0}
                            url={item.url}
                            loop={playType === RepeatOnce}
                            volume={volume}
                            playing={playing}
                            onPlay={this.handlePlay}
                            onPause={this.handlePause}
                            onProgress={this.handleProgress}
                            ref={this.ref}
                            muted={muted}
                            onDuration={this.handleDuration}
                            onEnded={()=>this.handleEnded()}
                            onError={e => console.log('onError', e)}
                        />


                        <div className="music-btn-group">
                            <Row type="flex" align="top">
                                <Col span={1}>
                                    <Button
                                        shape='circle'
                                        onClick={()=>this.handlePervious(-1)}
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
                                        onClick={()=>this.handlePervious(1)}
                                    >
                                        <Icon type="step-forward" />
                                    </Button>
                                </Col>
                               <Col span={1}>
                                   <Duration seconds={currentTime} />
                               </Col>
                                {/*progress*/}
                                <Col span={8}>
                                    <Slider
                                        min={0}
                                        step={1}
                                        max={duration}
                                        value={currentTime}
                                        onMouseDown={this.handleSeekMouseDown}
                                        onChange={this.handleSeekChange}
                                        onMouseUp={this.handleSeekMouseUp}
                                        tipFormatter={this.tipFormatter}
                                    />
                                </Col>
                                <Col span={1}>
                                    <Duration seconds={duration} />
                                </Col>

                                <Col span={1}>
                                    <Popover className="volume-popover" content={volumeContent}  trigger="hover">
                                        <Icon type="sound" />
                                    </Popover>
                                </Col>

                                <Col span={1}>
                                    {btnPlayType}
                                </Col>
                            </Row>
                        </div>
                    </Footer>
                </Layout>
            </div>

        )
    }
}

export default MusicPlayer;