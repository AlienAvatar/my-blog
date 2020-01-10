import React, { Component } from 'react'
import './style.css'

class ArticleListCell extends Component{
    constructor(props){
        super(props);
        this.state = {items:this.props.items}
    }

    render() {
        console.log(this.props.items);
        let items = this.state.items;
        return(
            <div className="ac_container">
                <div className="ac_content">
                   <div>

                   </div>
                </div>
            </div>
        )
    }
}

export default ArticleListCell