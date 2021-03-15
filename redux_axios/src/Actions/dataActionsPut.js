import {PUT_DATA, USERS_ERROR} from '../types'
import axios from 'axios'

export const putData = (id, title, completed) => async dispatch => {
    
    try{
        const res = await axios.put(`http://jsonplaceholder.typicode.com/todos/${id}`, {title: title, completed: completed})
        dispatch( {
            type: PUT_DATA,
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
