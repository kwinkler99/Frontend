export const logger = store => next => action => {
    if(action.type === "DECREMENT"){
        setInterval(
            () => next(action),
            1000
          );
    }


    if(action.type === "INCREMENT"){
        alert("liczba zostanie zwiekszona o 1")
    }
    console.log(action)
    next(action);
}