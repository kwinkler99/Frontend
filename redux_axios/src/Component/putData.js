import React, { Component } from 'react'
import {connect} from 'react-redux'
import {putData} from '../Actions/dataActionsPut'

 class Put extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: 0,
            title: "",
            completed: false
        }

        this.put = this.put.bind(this)
    }

    put(){
        this.props.putData(this.state.id, this.state.title, this.state.completed)
    }

    render() {
        
        return (
            <form>
                <input 
                    type="text"  
                    value={this.state.id}
                    onChange={ (event) => this.setState({...this.state, id: event.target.value}) }/>
                <input 
                    type="text"  
                    value={this.state.title}
                    onChange={ (event) => this.setState({...this.state, title: event.target.value}) }/>
                <select
                    onChange={ (event) => this.setState({...this.state, completed: event.target.value}) }  
                    name="completed">
                    <option value={this.state.completed}>true</option>
                    <option value={this.state.completed}>false</option>
                </select>
                <input 
                    type="button" 
                    value="Update" 
                    onClick={ () => this.put() }/>
            </form>

        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.filterJson
})

export default connect(mapStateToProps, {putData})(Put)