import React, {Component} from 'react';
import "./style.css";
import TestComponent from "../TestCompoent/TestComponent";

class TestContainer extends Component{
    render() {
        return(
            <div className="container">
                <div className="left-container">
                    <TestComponent />
                </div>
            </div>
        )
    }
}


export default TestContainer;