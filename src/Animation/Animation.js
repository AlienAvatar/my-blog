import React, { Component } from 'react'
import "./style.css";
// import img from "../../public/image/avatar.jpg"
class Animation extends Component{
    render() {
        return (
            <div className="troll">
                <div className="troll__head">
                    <img className="troll__face" src="https://i.ibb.co/8XVN8CW/trollface.png"
                         srcSet="https://i.ibb.co/8XVN8CW/trollface.png 1x, https://i.ibb.co/DW8Byny/trollface-2x.png 2x"
                         alt="Trollface" width="140" height="115"/>
                        <div className="troll__right-arm">
                            <div className="troll__right-lower-arm">
                                <div className="troll__right-hand"></div>
                            </div>
                        </div>
                        <div className="troll__left-arm">
                            <div className="troll__left-lower-arm">
                                <div className="troll__left-hand"></div>
                            </div>
                        </div>
                        <div className="troll__upper-body">
                            <div className="troll__lower-body">
                                <div className="troll__right-thigh">
                                    <div className="troll__right-lower-leg">
                                        <div className="troll__right-foot"></div>
                                    </div>
                                </div>
                                <div className="troll__left-thigh">
                                    <div className="troll__left-lower-leg">
                                        <div className="troll__left-foot"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default Animation;