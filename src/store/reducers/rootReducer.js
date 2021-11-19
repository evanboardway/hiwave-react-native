import { ORIENTATION_CHANGE, WSCONNECTED, WSCONNECTING, WSCONNECT, UPDATE_PEER_LOCATION, UPDATE_WSCONNECTIONSTATE, WRTC_REMOVE_STREAM, WRTC_DISCONNECTED, UPDATE_WRTC_CONNECTION_STATE, WRTC_UPDATE_CONNECTION_STATE, UPDATE_LOCATION, WRTC_ADD_STREAM, WRTC_REMOVE_TRACK } from "../../helpers/enums"

const initialState = {
    orientation: 'portrait',
    wsConnectionState: WSCONNECTING,
    wrtcConnectionState: WRTC_DISCONNECTED,
    currentLocation: {coords: {latitude: 1, longitude: 1}},
    peerLocations: new Map(),
    incomingStreams: new Array()
}

export function rootReducer(state = initialState, action) {
    switch(action.type) {
        case ORIENTATION_CHANGE:
            return {...state, orientation: action.payload}
        case UPDATE_WSCONNECTIONSTATE:
            return {...state, wsConnectionState: action.payload}
        case WRTC_UPDATE_CONNECTION_STATE:
            return {...state, wrtcConnectionState: action.payload}
        case UPDATE_LOCATION:
            return {...state, currentLocation: action.payload}
        case UPDATE_PEER_LOCATION:
            state.peerLocations.set(action.payload.UUID, action.payload.Location)
            // console.log(state.peerLocations)
            return state
        case WRTC_REMOVE_TRACK:
            newState = state.incomingStreams.filter(stream => stream.id != action.payload)
            console.log(newState.incomingStreams)
            return {...state, incomingStreams: newState}
        case WRTC_ADD_STREAM:
            return {...state, incomingStreams: action.payload}
        default:
            return state
    }
}