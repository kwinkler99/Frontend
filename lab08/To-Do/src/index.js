import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import rootReducer from './Reducers/reducer'
import Formularz from './Formularz'
import { Provider } from 'react-redux'
import './index.css'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}> 
      <Formularz />
  </Provider>
  
  ,document.getElementById("root")
);