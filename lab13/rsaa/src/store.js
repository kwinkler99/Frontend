import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';

import logger from 'redux-logger';

import {createMiddleware} from 'redux-api-middleware';
import todosReducers from "./ducks/todos/reducers";
import postsReducers from "./ducks/posts/reducers";

const rootReducer = combineReducers({...todosReducers, ...postsReducers});
const store = createStore(rootReducer, applyMiddleware(thunk, createMiddleware(), logger));

export default store;
