import {GET_PRODUCT, USERS_ERROR} from '../types'
import axios from 'axios'

export const getProduct = (id) => async dispatch => {
    
    try{
        const res = await axios.get(`http://localhost:5000/${id}`)
        dispatch( {
            type: GET_PRODUCT,
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
