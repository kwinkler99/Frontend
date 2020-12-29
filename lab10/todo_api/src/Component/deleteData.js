import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteData} from '../Actions/dataActionsDelete'

 class Delete extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: 0,
        }

        this.delete = this.delete.bind(this)
    }

    delete(){
        this.props.deleteData(this.state.id)
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
                        value="Delete" 
                        onClick={ () => this.delete() }/>
                </form>
            </div>

        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.filterJson
})

export default connect(mapStateToProps, {deleteData})(Delete)