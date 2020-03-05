import React, {Component,Fragment} from 'react';
import "./style.css";

let minsHand = null;
let hourHand = null;

class Decode extends Component{
    componentDidMount() {
        minsHand = document.querySelector('.min-hand');
        hourHand = document.querySelector('.hour-hand');
    }

    render() {
        return(
            <Fragment>
                <div className="clock">
                    <div className="clock-face">
                        <div className="clock-background"/>
                        <div className="hand hour-hand"></div>
                        <div className="hand min-hand"></div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


function setDate() {
    if(minsHand === null || hourHand === null){
        return;
    }
    const now = new Date();
    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    minsHand.addEventListener("mousedown",rotateDownMin);
    minsHand.addEventListener("mouseup",rotateUpMin);
    minsHand.addEventListener("mousemove",rotateMoveMin);
}

setInterval(setDate, 1000);

setDate();

const rotateDownMin = () => {
    minsHand.classList.add("active");
};

const rotateUpMin = () =>{
    minsHand.classList.remove("active");
};

const rotateMoveMin = (e) => {

};


export default Decode;