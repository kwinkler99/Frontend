import React, {Component} from 'react'
import Count from './Count.js'



const reduce = (state, action) => {
    switch (action.type){
        case 'addNew':
            return {items: [...state, action.new_item]};
        case 'addNumber':
            return state.map(element => {
                if(element.key === action.key){
                    return {
                        ...element,
                        number: element.number + action.number
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
            console.log(state)
            return state.map(element => {
                if(element.key === action.key){
                    return {
                        ...element,
                        number: element.number - 1
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
            counter: 0
        }
    }

    render(){
        return(
            <div>
                <Count reduce={reduce}/>
            </div>
        )
    }
}


export default Store;