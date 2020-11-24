import { combineReducers } from 'redux'

const counter = (state = [], action) => {
    
    switch (action.type){
        case 'ADDNEW':
            return [...state, action.new_item];
        case 'ADDNUMBER':
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
                        number: element.number - 1,
                        active: "active"
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
        case 'SET_INTERVAL':
            return state.map(element => {
                if(element.key === action.key){
                    return {
                        ...element,
                        someInterval: action.payload
                    }
                }
                return element  
            })
        case 'STOP_TIMER':
            return state.map(element => {
                if(element.key === action.key){
                    clearInterval(element.someInterval)
                    return {
                        ...element,
                        active: "inactive"
                    }
                }
                return element  
            })
        case 'STOP':
            return state
        default:
            return []; 
  }
}

export default combineReducers({ counter })