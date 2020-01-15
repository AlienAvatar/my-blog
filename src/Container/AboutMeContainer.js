import React, {Component, Fragment} from 'react';
import "./style.css";
import { Input,Tabs } from 'antd';
import RightContainer from "./RightContainer";
import AboutMe from "../AboutMe/AboutMe";

const { Search } = Input;
const { TabPane } = Tabs;
class AboutMeContainer extends Component{
    render() {
        return(
            <div className="container">
                <div className="left-container">
                    <AboutMe />
                </div>
                <RightContainer />
            </div>
        )
    }
}


export default AboutMeContainer;