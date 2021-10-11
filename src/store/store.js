import { createStore } from 'redux';
import { WSCONNECTING, UPDATE_WSCONNECTIONSTATE } from '../helpers/enums'

const initialState = {
    wsConnectionState: WSCONNECTING
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_WSCONNECTIONSTATE:
            return { ...state, wsConnectionState: action.payload }
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