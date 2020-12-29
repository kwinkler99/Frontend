import React, { Component }  from 'react';
import {connect} from 'react-redux'

import DataById from './Component/dataById'
import Post from './Component/postData'
import Put from './Component/putData'
import Patch from './Component/patchData'
import Delete from './Component/deleteData'
import {getData} from './Actions/dataActions'


class App extends Component {

    componentDidMount(){
        this.props.getData() 
    }

    render(){

        const {data} = this.props.data_main

        return (
            <div className="App">
                <h1>Find To-Do by id</h1> 
                    <DataById />
                <h1>Post To-Do</h1> 
                    <Post />
                <h1>Update To-Do by id</h1> 
                    <Put />
                <h1>Patch To-Do by id</h1> 
                    <Patch />
                <h1>Delete To-Do by id</h1> 
                    <Delete />
                {data.map(todo => 
                    <div key={todo.id}>
                        <p>{todo.id + ". " + todo.title + ", completed: " + todo.completed}</p> 
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps  = (state) => ({
    data_main: state.reducerJson,
    data_filter: state.filterJson
})

export default connect(mapStateToProps, {getData})(App)