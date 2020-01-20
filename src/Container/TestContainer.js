import React, {Component, Fragment} from 'react';
import "./style.css";
import RightContainer from "./RightContainer";
import TestComponent from "../TestCompoent/TestComponent";

class TestContainer extends Component{
    render() {
        return(
            <div className="container">
                <div className="left-container">
                    <TestComponent />
                </div>
                <RightContainer />
            </div>
        )
    }
}


export default FriendLinkContainer;