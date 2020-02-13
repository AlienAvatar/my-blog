import React, {Component} from 'react';
import "./style.css";
import RightContainer from "./RightContainer";
import AboutMe from "../SendArticle/AboutMe";

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