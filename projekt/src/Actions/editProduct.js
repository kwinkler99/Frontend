export const editProduct = (id) => dispatch => {
    dispatch( {
        type: 'EDIT_PRODUCT',
        id: id
    })
}
