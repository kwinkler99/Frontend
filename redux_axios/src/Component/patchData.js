import React, { Component } from 'react'
import {connect} from 'react-redux'
import {patchData} from '../Actions/dataActionsPatch'

 class Patch extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: 0,
            title: "",
            completed: false
        }

        this.patch = this.patch.bind(this)
    }

    patch(){
        this.props.patchData(this.state.id, this.state.title, this.state.completed)
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
                    value="Patch" 
                    onClick={ () => this.patch() }/>
            </form>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.filterJson
})

export default connect(mapStateToProps, {patchData})(Patch)