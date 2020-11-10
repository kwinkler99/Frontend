import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import reduce from './reducer'
import './index.css'

const store = createStore(reduce)

ReactDOM.render(
  <div>
    <Formularz 
      //copyState = { store.getState() } 
      immutableState = { store.getState() } 
      add = { (add) => store.dispatch({ type: 'ADD', add_new: add })}
      delete = { (lp) => store.dispatch({type: 'DELETE', lp: lp})}
      expired = { (lp) => store.dispatch({ type: 'EXPIRED', lp: lp })}
      done = { (lp) => store.dispatch({ type: 'DONE', lp: lp })}
      filter = { (box, text) => store.dispatch({ type: 'FILTER', box: box, text: text })}/>
  </div>,
  document.getElementById('root')
);

render()
store.subscribe(render)