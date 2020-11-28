import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import rootReducer from './Reducers/reducer'
import App from './App'
import { Provider } from 'react-redux'
import './index.css'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}> 
      <App />
  </Provider>
  
  ,document.getElementById("root")
);