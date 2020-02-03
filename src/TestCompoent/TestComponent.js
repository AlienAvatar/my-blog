import React, { Component,Fragment } from 'react'
import RightContainer from "../Container/RightContainer";

const TestButton = ({onClick,className = 'test-btn',children}) =>{
    return (
        <button
        onClick={onClick}
        className={className}
        type="button">
        {children}
        </button>
    )
};

const Loading = () => {
    return(
        <div>Loading</div>
    )
};

const withLoading = (Component) => ({isLoading, ...rest
    }) =>
    isLoading ? <Loading/> : <Component {...rest}/>

const ButtonWithLoading = withLoading(TestButton);

class TestComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <Fragment>

           </Fragment>
        )
    }
}

export default TestComponent;