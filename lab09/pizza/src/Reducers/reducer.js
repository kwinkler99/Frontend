import { combineReducers } from 'redux'

const ingredients = (state = [], action) => {

    switch (action.type){
        case 'ADD_INGREDIENT':
            const id = state.length === 0 ? 1 : state[state.length - 1].id + 1
            return [...state, {'name': action.new_ing, 'id': id, 'check': false}]
        case 'ADD_INGREDIENT_TO_PIZZA':
            state.map(a => {
                a.check = false;
                return a
            })
            return state

        default:
            return state
    }


}

const pizza = (state = [], action) => {
    switch (action.type){
        case 'ADD_INGREDIENT_TO_PIZZA':
            const id = state.length === 0 ? 1 : state[state.length - 1].id + 1
            return [...state, {'pizza': action.new_pizza, 'id': id}]
        default:
            return state
    }
}

export default combineReducers({ ingredients, pizza })