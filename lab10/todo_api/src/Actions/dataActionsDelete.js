import {DELETE_DATA, USERS_ERROR} from '../types'
import axios from 'axios'

export const deleteData = (id) => async dispatch => {
    
    try{
        const res = await axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
        dispatch( {
            type: DELETE_DATA,
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
