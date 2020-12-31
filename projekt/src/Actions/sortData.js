import {SORT_DATA, USERS_ERROR} from '../types'
import axios from 'axios'

export const sortData = (text, sort, check, to, from) => async dispatch => {
    try{
        const res = await axios.get(`./products.json`)
        dispatch( {
            type: SORT_DATA,
            text: text,
            sort: sort,
            check: check,
            to: to,
            from: from,
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
