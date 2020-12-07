import { combineReducers } from 'redux'

const ingredients = (state = [], action) => {

    switch (action.type){
        case 'ADD_INGREDIENT':
            return [...state, action.new_ing]
        default:
            return state
    }


}

const pizza = (state = [], action) => {
    switch (action.type){
        case 'ADD_INGREDIENT_TO_PIZZA':
            return state
        default:
            return state
    }
}

export default combineReducers({ ingredients, pizza })