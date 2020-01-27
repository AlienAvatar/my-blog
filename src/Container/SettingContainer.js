import React, {Component} from "react";
import Setting from "../Setting/Setting";
import RightContainer from "./RightContainer";
import "./style.css";

class SettingContainer extends Component{
    render() {
        return(
            <div className="container">
                <Setting />
            </div>
        )
    }
}


export default SettingContainer;