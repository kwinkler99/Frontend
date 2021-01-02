import {DELETE_PRODUCT, USERS_ERROR} from '../types'

export const deleteProduct = (id) => async dispatch => {
    
    try{
        dispatch( {
            type: DELETE_PRODUCT,
            id: id
        })

    }
    catch(e){
        dispatch( {
            type: USERS_ERROR,
            payload: console.log(e),
        })
    }
}
