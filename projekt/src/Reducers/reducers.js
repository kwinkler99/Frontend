import { combineReducers } from 'redux'



const initialState = {
    data:[],
    category: []
}

function arrangement(data){
    const response = data.map(item => {
        const {id, brand, name, price, currency, image_link, description, category, product_types, product_colors, tag_list} = item
        const product = {
            id: id,
            brand: brand,
            name: name,
            price: price,
            currency: currency,
            image: image_link,
            description: description,
            category: category === null ? "" : category,
            type: product_types,
            colors: product_colors,
            tag: tag_list
        }
        return product
    })
    return response
}

function takeCategory(data){
    const category = [...new Set(data.map((item) => item.category))].filter(
        (i) => i
    )

    return category
}


const products = (state = initialState, action) => {
    switch (action.type){
        case 'GET_DATA':
            return {
                ...state,
                data: arrangement(action.payload),
                category: takeCategory(action.payload)
            }
        case 'SORT_DATA':
            const data = arrangement(action.payload)
            const filterByText = data.filter(item => item.name.toLowerCase().startsWith(action.text.toLowerCase()))
            const filterByCategory = filterByText.filter(item => item.category.startsWith(...action.check.filter(a => a === item.category)))
            
            return {
                ...state,
                data: filterByCategory
            }
        default:
            return state;
    }
}



export default combineReducers({ products })