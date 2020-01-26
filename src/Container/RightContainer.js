import {Input, Tabs, Tag} from 'antd';
import React, {Component, Fragment} from 'react';
import "./style.css";
import Animation from "../Animation/Animation";
import Pagination from "antd/es/pagination";
import Divider from "antd/lib/divider";
import WeatherComponent from "../Weather/Weather";
import DailySentenceComponent from "../DailySentence/DailySentenceComponent";

const { TabPane } = Tabs;


function RightContainer() {
    return (
        <div className="right-container">
            <div className="msg-container">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="天气" key="1">
                        {/*<WeatherComponent />*/}
                    </TabPane>
                    <TabPane tab="每日一句" key="2">
                        {/*<DailySentenceComponent />*/}
                    </TabPane>
                    <TabPane tab="签到" key="3">

                    </TabPane>
                </Tabs>
            </div>

            <div className="tag-container shadow-container">
                <h5 style={{ marginBottom: 5 }}>标签</h5>
                <Divider />
                <div>
                    <Tag className="right-tag" color="magenta">杂谈</Tag>
                    <Tag className="right-tag" color="red">技术</Tag>
                    <Tag className="right-tag" color="volcano">volcano</Tag>
                    <Tag className="right-tag" color="orange">orange</Tag>
                    <Tag className="right-tag" color="gold">gold</Tag>
                    <Tag className="right-tag" color="lime">lime</Tag>
                </div>
            </div>
            <div className="animation-container">
                {/*<Animation />*/}
            </div>
        </div>
    )
}

export default RightContainer;