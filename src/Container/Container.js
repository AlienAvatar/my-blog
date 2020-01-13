import React, {Component, Fragment} from 'react';
import "./style.css";
import { Input,Tabs } from 'antd';
import ArticleList from "../ArticleList/ArticleList";
import Animation from "../Animation/Animation";
import Pagination from "antd/es/pagination";

const { Search } = Input;
const { TabPane } = Tabs;
class Container extends Component{
    render() {
        return(
            <div className="container">
                <div className="left-container">
                    <ArticleList />
                </div>
                <div className="right-container">
                    <div className="msg-container">
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Tab 1" key="1">
                                Content of Tab Pane 1
                            </TabPane>
                            <TabPane tab="Tab 2" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Tab 3" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </div>

                    <div className="tag-container shadow-container">

                    </div>
                    <div className="animation-container">
                        <Animation />
                    </div>
                </div>
            </div>
        )
    }
}

function callback(key) {
    console.log(key);
}
export default Container;