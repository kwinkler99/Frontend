import { combineReducers } from 'redux'


const initialState = {
    data:[],
    category: [],
    price: 0
}

function arrangement(data){
    const response = data.map(item => {
        const {id, brand, name, price, currency, image_link, description, category, product_types, product_colors, tag_list} = item
        
        //unique colors
        const result = Array.from(new Set(product_colors.map(s => s.colour_name)))
            .map(colour_name => {
                return {
                    colour_name: colour_name,
                    hex_value: product_colors.find(s => s.colour_name === colour_name).hex_value
                }
            });
        
        //save product
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
            colors: result,
            tag: tag_list,
            active: false
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

        case 'EDIT_PRODUCT':
            const editData = state.data.map(item => {
                if (item.id === action.id){
                    item.active = !item.active
                }
                return item
            })

            return {
                ...state,
                data: editData
            }

        case 'EDIT_DONE':
            const result = state.data.map(item => {
                if (item.id === action.id){
                    
                    return action.product
                }
                return item
            })
            return {
                ...state,
                data: result
            }
        
        case 'DELETE_PRODUCT':
            const withoutDelete = state.data.filter(item => item.id !== action.id)

            return {
                ...state,
                data: withoutDelete
            }

        default:
            return state;
    }
}


const initialProductState = {
    product: {
        colors: []
    }
}


const product = (state = initialProductState, action) => {
    switch(action.type){
        case 'GET_PRODUCT':
            return {
                ...state,
                product: arrangement(action.payload)[0],
            };
    
        default:
            return state
    }

}



export default combineReducers({ products, product })