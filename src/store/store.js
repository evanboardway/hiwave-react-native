import { createStore } from 'redux';
import { WSCONNECTING, UPDATE_WSCONNECTIONSTATE, WRTC_OFFER_RECEIVED, WRTC_CONNECTION_REQUESTED, WRTC_CONNECTING, WRTC_UPDATE_CONNECTION_STATE } from '../helpers/enums'

const initialState = {
    wsConnectionState: WSCONNECTING,
    wrtcConnectionState: "",
    wrtcOffer: "",
    wrtcAnswer: ""
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_WSCONNECTIONSTATE:
            return { ...state, wsConnectionState: action.payload }
        case WRTC_OFFER_RECEIVED:
            return { ...state, wrtcOffer: action.payload}
        case WRTC_UPDATE_CONNECTION_STATE:
            return { ...state, wrtcConnectionState: action.payload}
        default:
            return state
    }
}

const store = createStore(rootReducer)

export { store }


// Gona have something like this:

// state = {
//     WSCONNECTIONSTATE: "",
//     LOCATION: {
//         lat: 0,
//         long: 0
//     }

// }