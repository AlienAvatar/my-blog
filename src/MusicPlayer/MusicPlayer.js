import React from "react";
import {Button, Col, Icon, Row, Typography,Slider,Layout,Table,Popover} from "antd";
import ReactPlayer from "react-player";
import {RepeatOnce,Shuffle,SortRepeat,columns,shuffle} from "../Constant/MusicConstant";
import Duration from  "./Duration";
import {MusicList} from "./Config/MusicList";
import Lyric from "./Lyric/Lyric";
import "./style.css";

const {Title} = Typography;
const {Header,Footer, Content} = Layout;

const data = [];

class MusicPlayer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //音量
            volume: 0.8,
            //当playing为true时，自动播放，false，代表暂停
            playing: false,
            //总共时长
            duration: 0,
            //当前播放时间
            currentTime: 0,
            //静音状态 true时为静音
            muted:false,
            //播放类型
            // 1 代表单次循环
            // 2 代表循环播放
            // 3 代表随机播放
            playType:1,
            //Table 中选择row，现在还没用到
            selectedRowKeys: [],
            //当前播放歌曲的索引
            index:0,
        }
    }

    //把ReactPlayer绑定到类上，类以player来代替ReactPlayer对象
    ref = player => {
        this.player = player
    };

    componentWillMount() {
        const {playing} = this.state;
        //播放时，显示播放Icon，暂停时，显示暂停Icon，现在无法显示
        let playIcon;
        if(playing){
            playIcon = <Icon onClick={(e)=>this.onClickPlay(e)} className="play-inactive" width="1em" height="1em" type="play-circle" />
        }else {
            playIcon = <Icon onClick={(e)=>this.onClickPause(e)} className="play-inactive" width="1em" height="1em" type="pause-circle" />
        }

        //取MusicList填充data数组，供Table使用，因为MusicList没有play这个选项，MusicList可能从远程拿，data用来当作本地处理一个数据集
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

    //播放器结束时，进行playType操作
    handleEnded = () => {
        const {playType} = this.state;
        if(playType === SortRepeat){
            this.handlePervious(1);
            this.setState({
                currentTime:0,
                playing:true
            })
        }else if(playType === Shuffle){
            let randomIndex = Math.floor((Math.random()*data.length));
            this.setState({
                index:randomIndex,
                currentTime:0,
                playing:true
            })
        }
    };

    //进行音量调节 e为当前Slider 固定到的音乐量
    handleVolumeChange = e => {
        this.setState({ volume: e})
    };

    //暂停按钮操作
    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    };

    //播放器本身的播放
    // handlePlay = () => {
    //     console.log('onPlay');
    //     this.setState({
    //         playing: true
    //     })
    // };

    //播放器本身的暂停，如点击视频的暂停，在这暂时不需要
    // handlePause = () => {
    //     console.log('onPause');
    //     this.setState({ playing: false })
    // };

    //手动更改Slider，播放器进度条
    handleSeekChange = e => {
        //  seekTo(amout,type)
        //   Seek to the given number of seconds, or fraction if amount is between 0 and 1
        //   ◦  type parameter lets you specify 'seconds' or 'fraction' to override default behaviour
        //取到e，当前秒，给播放器
        this.player.seekTo(e);

        //更新当前播放的时间
        this.setState({
            currentTime: this.player.getCurrentTime()
        })
    };

    //播放器本身的进度条
    // handleProgress = state => {
    //     console.log('onProgress', state);
    //     const {player} = this.player;
    //
    //     this.setState({
    //         currentTime:player.getCurrentTime()
    //     })
    // };

    //Callback containing duration of the media, in seconds
    //player每次读取新的歌曲的duration，当切歌时就调用，计算总共时长（秒）
    handleDuration = (duration) => {
        console.log('onDuration', duration);
        this.setState({ duration })
    };

    //选择播放类型
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

    //Table中选择的行数
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    //Table 单击icon时，进行播放
    onClickPlay = (e) =>{
        this.setState({
            index:e.currentTarget.parentElement.parentElement.dataset.rowKey,
            playing: true,
            currentTime:0,
        })
    };

    //Table 单击icon时，进行暂停
    onClickPause = (e) =>{
        this.setState({
            playing: false
        })
    };

    //Table 双击时，进行播放
    doubleClickPlay = (e) =>{
        this.setState({
            index:e.currentTarget.dataset.rowKey,
            playing: true,
            currentTime:0,
        })
    };

    //Table 当hover row，展示Icon
    showOnPlay = (e) =>{
        const len = e.currentTarget.cells.length-1;
        e.currentTarget.cells[len].children[0].classList.remove("play-inactive");
        e.currentTarget.cells[len].children[0].classList.add("play-active");
    };
    //Table 当hover row，隐藏Icon
    hideOnPlay = (e) =>{
        const len = e.currentTarget.cells.length-1;
        e.currentTarget.cells[len].children[0].classList.remove("play-active");
        e.currentTarget.cells[len].children[0].classList.add("play-inactive");
    };

    //全部选择，可以用来下载
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
        const {volume,playing,muted,duration,playType, loading, selectedRowKeys,index,currentTime} = this.state;
        //Table
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
                                        onChange={this.handleSeekChange}
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