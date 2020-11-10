const reduce = (state, action) => {
    switch(action.type){
        case 'ADD':
            return [...state, action.add_new]
        case 'DELETE':
            return state.filter(element => element.lp !== action.lp)
        case 'EXPIRED':
            return state.map(element => {
                if(element.lp === action.lp){
                    return {
                        ...element,
                        active: 'Expired'
                    }
                }
                return element
                
            })
        case 'DONE':
            return state.map(element => {
                if(element.lp === action.lp){
                    return {
                        ...element,
                        active: 'Done'
                    }
                }
                return element

            })
        case 'FILTER':
            if (action.box !== "All"){
                return (state.filter(function(item) {
                            return(item.active === action.box)
                        }))
            }
            else{
                return state
            }

        default:
            //do nothing    
    }
}

export default reduce;