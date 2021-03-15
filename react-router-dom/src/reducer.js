const reduce = (state, action) => {
    if(state === undefined){
        return [
            {id: 0, name: 'Polska', flag: ['bialy', 'czerwony'], capital: 'Warszawa'},
            {id: 1, name: 'UK', flag: ['niebieski', 'bialy'], capital: 'Londyn'}
        ]
    }
    switch(action.type){
        case 'CHANGE':
            return state.map(elem => {
                if(elem.id === parseInt(action.id)){
                    elem.name = action.name;
                    elem.flag = action.flag;
                    elem.capital = action.capital;
                    return elem
                  }
                  else{
                    return elem
            }})

        default:
                //do nothing  
    }
}

export default reduce