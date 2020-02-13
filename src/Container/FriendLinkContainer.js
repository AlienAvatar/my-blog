import React, {Component} from 'react';
import "./style.css";
import RightContainer from "./RightContainer";
import FriendLink from "../SendArticle/FriendLink";

class FriendLinkContainer extends Component{
    render() {
        return(
            <div className="container">
                <div className="left-container">
                    <FriendLink />
                </div>
                <RightContainer />
            </div>
        )
    }
}


export default FriendLinkContainer;