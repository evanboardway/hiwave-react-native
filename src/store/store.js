import { createStore, applyMiddleware } from 'redux';
import { websocketMiddleware } from './middleware/wsMiddleware';
import { websocketReducer } from './reducers/wsReducer';

export const store = createStore(websocketReducer, applyMiddleware(websocketMiddleware))


// const initialState = {
//     wsConnectionState: WSCONNECTING,
//     wrtcConnectionState: "",
//     wrtcOffer: "",
//     wrtcAnswer: ""
// }

// const rootReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case UPDATE_WSCONNECTIONSTATE:
//             return { ...state, wsConnectionState: action.payload }
//         case WRTC_OFFER_RECEIVED:
//             return { ...state, wrtcOffer: action.payload}
//         case WRTC_UPDATE_CONNECTION_STATE:
//             return { ...state, wrtcConnectionState: action.payload}
//         default:
//             return state
//     }
// }