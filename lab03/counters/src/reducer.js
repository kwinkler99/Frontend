function counter(state, action){
    if(state === undefined){
        return []
    }

    switch (action.type){
        case 'ADDNEW':
            return [...state, action.new_item];
        case 'ADDNUMBER':
            return state.map(element => {
                if(element.key === action.key){
                    return {
                        ...element,
                        number: element.number + action.number,
                        text: ""
                    }
                }
                return element           
            })
        case 'DELETE': 
            return state.filter(element => element.key !== action.key)
        case 'INCREMENT':
            return state.map(element => {
                if(element.key === action.key){
                    return {
                        ...element,
                        number: element.number + 1
                    }
                }
                return element           
            })
        case 'DECREMENT':
            return state.map(element => {
                if(element.key === action.key){
                    return {
                        ...element,
                        number: element.number - 1
                    }
                }
                return element           
            })
        case 'TEXT':
            return state.map(element => {
                if(element.key === action.key){
                    return {
                        ...element,
                        text: action.txt
                    }
                }
                return element  
            })
        default:
            //do nothing  
  }
}

export default counter