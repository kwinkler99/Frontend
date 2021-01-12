import { combineReducers } from 'redux'


const initialState = []

const formularz = (state = initialState, action) => {
    switch (action.type){
        case 'ADD_POST':
            return [...state, {...action.new_values, id: state.length}]
        case 'ADD_COMMENT':
            let num = 0
            const new_values = action.new_values.map(item => {
                num = num + 1
                return {...item, id: num}
            })
            const result = state.map(item => {
                if(item.id === action.id){
                    item.comments = new_values
                }
                return item
            })
            return result
        default:
            return state
    }
}


export default combineReducers({ formularz })