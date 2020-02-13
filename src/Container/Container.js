import React, {Component} from 'react';
import "./style.css";
import ArticleList from "../ArticleList/ArticleList";
import RightContainer from "./RightContainer";

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