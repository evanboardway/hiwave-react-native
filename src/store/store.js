import { createStore, applyMiddleware, combineReducers } from 'redux';
import { websocketMiddleware } from './middleware/wsMiddleware';
import { webrtcMiddleware } from "./middleware/wrtcMiddleware";
import { locationServiceMiddleware } from './middleware/lsMiddleware'
import { avatarMiddleware } from './middleware/avatarMiddleware';
import { rootReducer } from './reducers/rootReducer';


export const store = createStore(rootReducer, applyMiddleware(websocketMiddleware, webrtcMiddleware, locationServiceMiddleware, avatarMiddleware))
