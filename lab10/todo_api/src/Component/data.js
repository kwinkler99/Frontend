import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getData} from '../Actions/dataActions'

 class Data extends Component {

    componentDidMount(){
        this.props.getData() 
    }

    render() {
        const {data} = this.props.data

        
        return (
            <div>
                {data.map(todo => 
                    <div key={todo.id}>
                        <p>{todo.id + ". " + todo.title + ", completed: " + todo.completed}</p> 
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.reducerJson
})

export default connect(mapStateToProps, {getData})(Data)