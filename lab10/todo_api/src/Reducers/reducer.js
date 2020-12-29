import { combineReducers } from 'redux'

const initialState = {
    data:[],
    loading:true
}

const reducerJson = (state = initialState, action) => {
    switch (action.type){
        case 'GET_DATA':
            return {
                ...state,
                data: action.payload,
                loading: false,
            }
       
        default:
            return state;
    }
}

const filterJson = (state = {}, action) => {
    switch (action.type){
        case 'GET_DATA_BY_ID':
            return action.payload
        case 'POST_DATA':
            return action.payload
        case 'PUT_DATA':
            return action.payload
        case 'PATCH_DATA':
            return action.payload
        case 'DELETE_DATA':
            return action.payload
        default:
            return state;
    }
}



export default combineReducers({ reducerJson,  filterJson})