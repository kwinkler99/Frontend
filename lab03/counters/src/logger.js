export const logger = store => next => action => {

    if(action.type === "DECREMENT" && action.active === "inactive"){
        const interval = setInterval(() => next(action), 1000)
        store.dispatch({
            type: "SET_INTERVAL",
            payload: interval,
            key: action.key
        });
    }

    
    if(action.type === 'STOP'){
        store.dispatch({
            type: "STOP_TIMER",
            key: action.key
        })
    }


    if(action.type === "INCREMENT"){
        alert("liczba zostanie zwiekszona o 1")
    }
    console.log(action)
    next(action);
}