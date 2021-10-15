import { createStore, applyMiddleware, combineReducers } from 'redux';
import { websocketMiddleware } from './middleware/wsMiddleware';
import { websocketReducer } from './reducers/wsReducer';

export const store = createStore(websocketReducer, applyMiddleware(websocketMiddleware))
