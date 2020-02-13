import React, {Component} from 'react';
import "./style.css";
import RightContainer from "./RightContainer";
import SendArticle from "../SendArticle/SendArticle";

class ArticleContainer extends Component{
    render() {
        return(
            <div className="container">
                <div className="left-container">
                    <SendArticle />
                </div>
                <RightContainer />
            </div>
        )
    }
}


export default ArticleContainer;