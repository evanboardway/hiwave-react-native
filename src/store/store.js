import { createStore, applyMiddleware, combineReducers } from 'redux';
import { websocketMiddleware } from './middleware/wsMiddleware';
import { webrtcMiddleware } from "./middleware/wrtcMiddleware";
import { rootReducer } from './reducers/rootReducer';

export const store = createStore(rootReducer, applyMiddleware(websocketMiddleware, webrtcMiddleware))
