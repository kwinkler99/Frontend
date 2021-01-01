import { combineReducers } from 'redux'



const initialState = {
    data:[],
    category: [],
    price: 0
}

function arrangement(data){
    const response = data.map(item => {
        const {id, brand, name, price, currency, image_link, description, category, product_types, product_colors, tag_list} = item
        const product = {
            id: id,
            brand: brand,
            name: name,
            price: parseFloat(price) || 0,
            currency: currency,
            image: image_link,
            description: description,
            category: category || "others",
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
    return [...category, "others", "all"]
}

const sortBy = (key) => {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
};



const products = (state = initialState, action) => {
    switch (action.type){

        case 'GET_DATA':
            return {
                ...state,
                data: arrangement(action.payload),
                category: takeCategory(action.payload),
                price: Math.max(...action.payload.map(item => item.price))
            }

        case 'SORT_DATA':
            const data = arrangement(action.payload)
            const filterByText = data.filter(item => item.name.toLowerCase().startsWith(action.text.toLowerCase()))
            const filterByCategory = filterByText.filter(item => item.category.startsWith(...action.check.filter(a => a === item.category))) 
            let sortData = []
            if(action.sort === "reverse"){
                sortData = filterByCategory.concat().sort(sortBy(["name"])).reverse()
            }
            else{
                sortData = filterByCategory.concat().sort(sortBy([action.sort]))
            }
            const filterByPrice = sortData.filter(item => action.from < item.price && item.price < action.to)

            return {
                ...state,
                data: filterByPrice
            }

        default:
            return state;
    }
}



export default combineReducers({ products })