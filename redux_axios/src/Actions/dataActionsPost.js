import {POST_DATA, USERS_ERROR} from '../types'
import axios from 'axios'

export const postData = (title, completed) => async dispatch => {
    
    try{
        const res = await axios.post(`http://jsonplaceholder.typicode.com/todos`, {title: title, completed: completed})
        dispatch( {
            type: POST_DATA,
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
