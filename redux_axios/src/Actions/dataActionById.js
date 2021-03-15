import {GET_DATA_BY_ID, USERS_ERROR} from '../types'
import axios from 'axios'

export const getDataById = (id) => async dispatch => {
    
    try{
        const res = await axios.get(`http://jsonplaceholder.typicode.com/todos/` + id)
        dispatch( {
            type: GET_DATA_BY_ID,
            payload: res.data,
        })

    }
    catch(e){
        dispatch( {
            type: USERS_ERROR,
            payload: console.log(e),
        })
    }
}
