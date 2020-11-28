import React, { Component } from 'react';
import Count from './Count.js';
import {connect} from "react-redux";
import './index.css'


class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <Count 
                value={this.props.value}
                addNew={this.props.addNew}
                addNumber={this.props.addNumber}
                delete={this.props.delete}
                increment={this.props.increment}
                decrement={this.props.decrement}
                text={this.props.text}
                stop={this.props.stop}/>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        value: state.counter
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        addNew: (new_add) => {
            dispatch({ type: 'ADDNEW', new_item: new_add });
        },
        addNumber: (key, num) => {
            dispatch({ type: 'ADDNUMBER', key: key, number: num })
        },
        delete: (key) => {
            dispatch({ type: 'DELETE', key: key })
        },
        increment: (key) => {
            dispatch({ type: 'INCREMENT', key: key })
        },
        decrement: (key, active) => {
            dispatch({ type: 'DECREMENT', key: key, active: active })
        },
        text: (key, txt) => {
            dispatch({ type: 'TEXT', key: key, txt: txt })
        },
        stop: (key) => {
            dispatch({ type: "STOP", key: key })
        }
    }
}

  

export default connect(mapStateToProps, mapDispatchToProps)(App);