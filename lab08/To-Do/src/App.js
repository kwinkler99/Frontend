import React, { Component } from 'react';
import Formularz from './Formularz.js'
import {connect} from "react-redux";
import './index.css'

class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <Formularz 
                value = { this.props.value.list }
                copyValue = { this.props.value.copyList } 
                add = { this.props.add }
                delete = { this.props.delete }
                expired = { this.props.expired }
                done = { this.props.done }
                filter = { this.props.filter } />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        value: state.reduce
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        add: (add) => {
            dispatch({ type: 'ADD', add_new: add })
        },
        delete: (lp) => {
            dispatch({type: 'DELETE', lp: lp })
        },
        expired: (lp) => {
            dispatch({ type: 'EXPIRED', lp: lp })
        },
        done: (lp) => {
            dispatch({ type: 'DONE', lp: lp })
        },
        filter: (box, text) => {
            dispatch({ type: 'FILTER', box: box, text: text })
        }
    }
}

  

export default connect(mapStateToProps, mapDispatchToProps)(App);