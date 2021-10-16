import { WSCONNECTED, WSCONNECTING, WSCONNECT, UPDATE_WSCONNECTIONSTATE, WRTC_DISCONNECTED, UPDATE_WRTC_CONNECTION_STATE } from "../../helpers/enums"

const initialState = {
    wsConnectionState: WSCONNECTING,
    wrtcConnectionState: WRTC_DISCONNECTED
}

export function rootReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_WSCONNECTIONSTATE:
            console.log("PAYLOAD ", action.payload)
            return {...state, wsConnectionState: action.payload}
        case UPDATE_WRTC_CONNECTION_STATE:
            return {...state, wrtcConnectionState: action.payload}
        default:
            // console.log("REDUCER ", action)
            return state
    }
}