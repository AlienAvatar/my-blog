import React, {Component, Fragment} from 'react';
import "./style.css";
import RightContainer from "./RightContainer";
import DetailComponent from  "../SendArticle/DetailComponent"


class ArticleDetailContainer extends Component{

    render() {
        // let { id } = useParams();
        // console.log(id);
        return(
            <div className="container">
                <div className="left-container">
                    <DetailComponent />
                </div>
                <RightContainer />
            </div>
        )
    }
}

export default ArticleDetailContainer;