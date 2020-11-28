import { combineReducers } from 'redux'

const start = {
    list: [],
    copyList: []
} 

const reduce = (state = start, action) => {
    switch(action.type){
        case 'ADD':
            return {
                list: [ ...state.copyList, action.add_new ],
                copyList: [ ...state.copyList, action.add_new ]
            }
              
        case 'DELETE':
            return {
                list: state.list.filter(element => element.lp !== action.lp),
                copyList: state.copyList.filter(element => element.lp !== action.lp)
            }
            
        case 'FILTER':
            if (action.box !== "All"){
                return ({
                    ...state,
                    list: state.copyList
                        .filter(item => item.text.toLowerCase().startsWith(action.text.toLowerCase()))
                        .filter(function(item) {
                            return(item.active === action.box)
                        })})
            }
            else{
                return {
                    ...state,
                    list: state.copyList
                        .filter(item => item.text.toLowerCase().startsWith(action.text.toLowerCase()))
                }
            }

        default:
            return state;
    }
}


const archives = (state = [], action) => {
    switch(action.type){
        case 'ADD_TO_ARCHIVES_DONE':
            action.new_arch.lp = state.length + 1
            action.new_arch.active = 'Done'
            return [...state, action.new_arch]

        case 'ADD_TO_ARCHIVES_EXPIRED':
            action.new_arch.lp = state.length + 1
            action.new_arch.active = 'Expired'
            return [...state, action.new_arch]

        default:
            return state;
    }
}

export default combineReducers({ reduce, archives })