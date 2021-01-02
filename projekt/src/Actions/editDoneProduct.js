import {EDIT_DONE, USERS_ERROR} from '../types'

export const editDone = (id, product) => async dispatch => {
    
    try{
        dispatch( {
            type: EDIT_DONE,
            id: id,
            product: product
        })

    }
    catch(e){
        dispatch( {
            type: USERS_ERROR,
            payload: console.log(e),
        })
    }
}
