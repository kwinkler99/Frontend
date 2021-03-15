import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import reducer from './Reducers/reducer'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'



const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


