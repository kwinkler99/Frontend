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
                archives = { this.props.archives }
                copyValue = { this.props.value.copyList } 
                add = { this.props.add }
                add_to_archives_done = { this.props.add_to_archives_done }
                add_to_archives_expired = { this.props.add_to_archives_expired }
                delete = { this.props.delete }
                expired = { this.props.expired }
                done = { this.props.done }
                filter = { this.props.filter } />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        value: state.reduce,
        archives: state.archives
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        add_to_archives_done: (arch) => {
            dispatch({ type: 'ADD_TO_ARCHIVES_DONE', new_arch: arch })
        },
        add_to_archives_expired: (arch) => {
            dispatch({ type: 'ADD_TO_ARCHIVES_EXPIRED', new_arch: arch })
        },
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