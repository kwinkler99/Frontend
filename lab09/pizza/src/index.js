import React from 'react';
import ReactDOM from 'react-dom';
import Pizza from './Pizza'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './Reducers/reducer'


const store = createStore(rootReducer)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <Pizza />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

