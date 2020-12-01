import React from 'react';
import ReactDOM from 'react-dom';
import Pizza from './Pizza'
import pizza from './Reducers/reducer'
import { createStore } from 'redux'


const store = createStore(pizza)


ReactDOM.render(
  <React.StrictMode>
    <Pizza 
      data = { store.getState() }
      />
  </React.StrictMode>,
  document.getElementById('root')
);

