import {GET_DATA, USERS_ERROR} from '../types'
import axios from 'axios'

export const getData = () => async dispatch => {
    
    try{
        const res = await axios.get(`http://jsonplaceholder.typicode.com/todos`)
        dispatch( {
            type: GET_DATA,
            payload: res.data
        })

    }
    catch(e){
        dispatch( {
            type: USERS_ERROR,
            payload: console.log(e),
        })
    }
}
