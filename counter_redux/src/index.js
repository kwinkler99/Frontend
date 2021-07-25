import React from 'react';
import ReactDOM from 'react-dom';
import Count from './Count.js';
import { applyMiddleware, createStore } from 'redux'
import { logger } from './logger.js'
import counter from './reducer'
import './index.css'


const store = createStore(counter, applyMiddleware(logger))

const render = () => ReactDOM.render(
    <Count 
        value={store.getState()}
        addNew={(new_add) => store.dispatch({ type: 'ADDNEW', new_item: new_add })}
        addNumber={(key, num) => store.dispatch({ type: 'ADDNUMBER', key: key, number: num })}
        delete={(key) => store.dispatch({ type: 'DELETE', key: key })}
        increment={(key) => store.dispatch({ type: 'INCREMENT', key: key })}
        decrement={(key, active) => store.dispatch({ type: 'DECREMENT', key: key, active: active })}
        text={(key, txt) => store.dispatch({ type: 'TEXT', key: key, txt: txt })}
        stop={(key) => store.dispatch({ type: "STOP", key: key })}/>,
    document.getElementById("root")
);

render()
store.subscribe(render)