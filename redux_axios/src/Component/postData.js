import React, { Component } from 'react'
import {connect} from 'react-redux'
import {postData} from '../Actions/dataActionsPost'

 class Post extends Component {
    constructor(props){
        super(props)

        this.state = {
            title: "",
            completed: false
        }

        this.post = this.post.bind(this)
    }

    post(){
        this.props.postData(this.state.title, this.state.completed)
    }

    render() {
        
        return (
            <form>
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
                    value="Post" 
                    onClick={ () => this.post() }/>
            </form>

        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.filterJson
})

export default connect(mapStateToProps, {postData})(Post)