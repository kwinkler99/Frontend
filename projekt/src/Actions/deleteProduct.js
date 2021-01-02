import {DELETE_PRODUCT, USERS_ERROR} from '../types'
import axios from 'axios'

export const deleteProduct = (id) => async dispatch => {
    
    try{
        const res = await axios.all([
            axios.delete(`http://localhost:5000/${id}`),
            axios.get(`http://localhost:5000`)
        ])

        dispatch( {
            type: DELETE_PRODUCT,
            payload: res[1].data
        })
    }
    catch(e){
        dispatch( {
            type: USERS_ERROR,
            payload: console.log(e),
        })
    }
}
