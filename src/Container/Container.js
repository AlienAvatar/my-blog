import React, {Component, Fragment} from 'react';
import "./style.css";
import { Input,Tabs } from 'antd';
import ArticleList from "../ArticleList/ArticleList";
import RightContainer from "./RightContainer";

const { Search } = Input;
const { TabPane } = Tabs;
class Container extends Component{
    render() {
        return(
            <div className="container">
                <div className="left-container">
                    <ArticleList />
                </div>
                <RightContainer />
            </div>
        )
    }
}


export default Container;