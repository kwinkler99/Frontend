import { combineReducers } from 'redux'

const pizza = (state = {'ingredients': []}, action) => {

    switch (action.type){
        case 'ADD INGREDIENT':
            return state
        default:
            return state
    }


}

export default pizza;