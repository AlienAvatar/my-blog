import React, { Component } from 'react'
import RightContainer from "../Container/RightContainer";

const addArticleUrl = "http://localhost:8081/api/addArticle";
const content = "content=";

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
            <div classname="send-article-container">
                <div classname="about-article">
                    <div classname="send-container shadow-container">
                        <buttonwithloading
                        >more</buttonwithloading>
                        <rightcontainer/>
                    </div>
                </div>
            </div>
        )
    }
}


/**
 * Test Function
 */
function test(){}

export default TestComponent;