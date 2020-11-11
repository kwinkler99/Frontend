const reduce = (state, action) => {
    if(state === undefined){
        return {
            list: [],
            copyList: []
        }
    }

    switch(action.type){
        case 'ADD':
            console.log(state)
            return {
                list: [ ...state.list, action.add_new ],
                copyList: [ ...state.copyList, action.add_new ]
            }
              
        case 'DELETE':
            return {
                list: state.list.filter(element => element.lp !== action.lp),
                copyList: state.copyList.filter(element => element.lp !== action.lp)
            }
        case 'EXPIRED':
            return {
                list: state.list.map(element => {
                    if(element.lp === action.lp){
                        return {
                            ...element,
                            active: 'Expired'
                        }
                    }
                    return element
                }),
                copyList: state.copyList.map(element => {
                    if(element.lp === action.lp){
                        return {
                            ...element,
                            active: 'Expired'
                        }
                    }
                    return element
                })
            }
            
        case 'DONE':
            return {
                list: state.list.map(element => {
                    if(element.lp === action.lp){
                        return {
                            ...element,
                            active: 'Done'
                        }
                    }
                    return element
                }),
                copyList: state.copyList.map(element => {
                    if(element.lp === action.lp){
                        return {
                            ...element,
                            active: 'Done'
                        }
                    }
                    return element
                })
            }
        case 'FILTER':
            if (action.box !== "All"){
                return ({
                    ...state,
                    list: state.copyList
                        .filter(item => item.text.toLowerCase().startsWith(action.text.toLowerCase()))
                        .filter(function(item) {
                            return(item.active === action.box)
                        })})
            }
            else{
                return {
                    ...state,
                    list: state.copyList
                        .filter(item => item.text.toLowerCase().startsWith(action.text.toLowerCase()))
                }
            }

        default:
            //do nothing    
    }
}

export default reduce;