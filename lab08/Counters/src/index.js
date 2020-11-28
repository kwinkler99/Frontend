import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { applyMiddleware, createStore } from 'redux'
import { logger } from './Actions/logger.js'
import rootReducer from './Reducers/reducer'
import { Provider } from 'react-redux'
import './index.css'


const store = createStore(rootReducer, applyMiddleware(logger))

ReactDOM.render(
    <Provider store={store}> 
        <App />
    </Provider>
    
    ,document.getElementById("root")
);


