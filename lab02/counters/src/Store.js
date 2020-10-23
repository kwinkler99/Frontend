import React, {Component} from 'react'
import Count from './Count.js'



const reduce = (state, action) => {
    switch (action.type){
        case 'addNew':
            return [...state, action.new_item];
        case 'addNumber':
            return state.map(element => {
                if(element.key === action.key){
                    return {
                        ...element,
                        number: element.number + action.number,
                        text: ""
                    }
                }
                return element           
            })
        case 'DELETE': 
            return state.filter(element => element.key !== action.key)
        case 'INCREMENT':
            return state.map(element => {
                if(element.key === action.key){
                    return {
                        ...element,
                        number: element.number + 1
                    }
                }
                return element           
            })
        case 'DECREMENT':
            return state.map(element => {
                if(element.key === action.key){
                    return {
                        ...element,
                        number: element.number - 1
                    }
                }
                return element           
            })
        case 'TEXT':
            return state.map(element => {
                if(element.key === action.key){
                    return {
                        ...element,
                        text: action.txt
                    }
                }
                return element  
            })
        case 'START':
            return state;
        }
}


class Store extends Component {
    constructor(props){
        super(props)

        this.state = {
            immutableState: reduce([], {type: 'START'})
        }

        this.setImmutableState = this.setImmutableState.bind(this)
    }

    setImmutableState(action){
        this.setState({
            immutableState: reduce(this.state.immutableState, action)
        })
    }

    render(){
        return(
            <div>
                <Count immutableState={this.state.immutableState} setImmutableState={this.setImmutableState}/>
            </div>
        )
    }
}


export default Store;