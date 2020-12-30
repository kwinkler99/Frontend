import { combineReducers } from 'redux'

const initialState = {
    data:[]
}

const products = (state = initialState, action) => {
    switch (action.type){
        case 'GET_DATA':
            const response = action.payload.map(item => {
                const {id, brand, name, price, currency, image_link, description, category, product_types, product_colors, tag_list} = item
                const product = {
                    id: id,
                    brand: brand,
                    name: name,
                    price: price,
                    currency: currency,
                    image: image_link,
                    description: description,
                    category: category,
                    type: product_types,
                    colors: product_colors,
                    tag: tag_list
                }
                return product
            })

            return {
                ...state,
                data: response.reverse()
            }
       
        default:
            return state;
    }
}



export default combineReducers({ products })