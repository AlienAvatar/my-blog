import {Input, Tabs, Tag} from 'antd';
import React, {Component, Fragment} from 'react';
import "./style.css";
import Animation from "../Animation/Animation";
import Pagination from "antd/es/pagination";
import Divider from "antd/lib/divider";
import WeatherComponent from "../Weather/Weather";
import DailySentenceComponent from "../DailySentence/DailySentenceComponent";
import WhateverSay from "../DailySentence/WhateverSay";

const { TabPane } = Tabs;


function RightContainer() {
    return (
        <div className="right-container">
            <div className="msg-container">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="天气" key="1">
                        <WeatherComponent />
                    </TabPane>
                    <TabPane tab="每日一句" key="2">
                        <DailySentenceComponent />
                    </TabPane>
                    <TabPane tab="说说" key="3">
                        <WhateverSay />
                    </TabPane>
                </Tabs>
            </div>

            <div className="tag-container shadow-container">
                <h5 style={{ marginBottom: 5 }}>标签</h5>
                <Divider />
                <div>
                    <Tag className="right-tag" color="magenta">杂谈</Tag>
                    <Tag className="right-tag" color="red">技术</Tag>
                    <Tag className="right-tag" color="volcano" onClick={openGithub}>GitHub</Tag>
                    <Tag className="right-tag" color="orange" onClick={openTencentVedio}>无问西东</Tag>
                    <Tag className="right-tag" color="gold">流浪远方</Tag>
                    <Tag className="right-tag" color="lime">镜花水月</Tag>
                </div>
            </div>
            <div className="animation-container">
                {/*<Animation />*/}
            </div>
        </div>
    )
}

function openGithub() {
    window.open("https://github.com/AlienAvatar","github");
}

function openTencentVedio(){
    window.open("https://v.qq.com/x/cover/wagzbx91asjomnu/z0026lwsaws.html","github");
}

export default RightContainer;