import React, {Component} from 'react';
import "./style.css";
import Decode from "../Decode/Decode"
class DecodeContainer extends Component{
    render() {
        return(
            <div className="container">
                <Decode />
            </div>
        )
    }
}


export default DecodeContainer;