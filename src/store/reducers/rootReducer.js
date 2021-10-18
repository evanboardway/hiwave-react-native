import { WSCONNECTED, WSCONNECTING, WSCONNECT, UPDATE_WSCONNECTIONSTATE, WRTC_DISCONNECTED, UPDATE_WRTC_CONNECTION_STATE, WRTC_UPDATE_CONNECTION_STATE, UPDATE_LOCATION } from "../../helpers/enums"

const initialState = {
    wsConnectionState: WSCONNECTING,
    wrtcConnectionState: WRTC_DISCONNECTED,
    currentLocation: {coords: {latitude: 1, longitude: 1}}
}

export function rootReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_WSCONNECTIONSTATE:
            return {...state, wsConnectionState: action.payload}
        case WRTC_UPDATE_CONNECTION_STATE:
            return {...state, wrtcConnectionState: action.payload}
        case UPDATE_LOCATION:
            return {...state, currentLocation: action.payload}
        default:
            // console.log("REDUCER ", action)
            return state
    }
}