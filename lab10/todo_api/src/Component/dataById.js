import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getDataById} from '../Actions/dataActionById'

 class DataById extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: 0
        }

        this.findById = this.findById.bind(this)
    }

    findById(){
        this.props.getDataById(parseInt(this.state.id))
    }

    render() {
        
        return (
            <div>
                <form>
                    <input 
                        type="text"  
                        value={this.state.id}
                        onChange={ (event) => this.setState({...this.state, id: event.target.value}) }/>
                    <input 
                        type="button" 
                        value="Find" 
                        onClick={ () => this.findById() }/>
                </form>
                {this.props.data.id + ". " + this.props.data.title + ", completed: " + this.props.data.completed}
            </div>

        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.filterJson
})

export default connect(mapStateToProps, {getDataById})(DataById)