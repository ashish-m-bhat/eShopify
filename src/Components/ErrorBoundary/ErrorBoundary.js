import { Component } from "react";
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component{
    constructor(){
        super();
        this.state = {isError:false, message:''}
    }
    componentDidCatch(error){
        this.setState({isError: true, message:error})
        console.log(error);
    }
    render(){
        if(this.state.isError)
            return <h1>OOps</h1>

        return (this.props.children)
    }
}

ErrorBoundary.propTypes = {
    children:PropTypes.node
}