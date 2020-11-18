import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import reduce from './reducer'

const store = createStore(reduce)

const render = () => ReactDOM.render(
  <React.StrictMode>
    <App 
      data = { store.getState() }
      change = { (id, name, flag, capital) => store.dispatch({type: 'CHANGE', id: id, name: name, flag: flag, capital: capital })}/>
  </React.StrictMode>,
  document.getElementById('root')
);

render()
store.subscribe(render)

