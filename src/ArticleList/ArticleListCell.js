import React, { Component } from 'react'
import './style.css'
import {Divider} from "antd";

class ArticleListCell extends Component{
    constructor(props){
        super(props);
    }

    render() {
        let item = this.props.item;
        console.log(item);
        return(
            <div className="cell_container">
                <div className="cell_title"/>
                <Divider></Divider>
                <div className="cell_content">
                   <div>

                   </div>
                </div>
                <div className="cell-foot">
                    <Divider className="cell-foot-line"/>
                </div>

            </div>
        )
    }
}

export default ArticleListCell