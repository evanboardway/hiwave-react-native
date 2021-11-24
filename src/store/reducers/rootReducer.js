import { ORIENTATION_CHANGE, WSCONNECTED, WSCONNECTING, WSCONNECT, UPDATE_PEER_LOCATION, UPDATE_WSCONNECTIONSTATE, WRTC_REMOVE_STREAM, WRTC_DISCONNECTED, UPDATE_WRTC_CONNECTION_STATE, WRTC_UPDATE_CONNECTION_STATE, UPDATE_LOCATION, WRTC_ADD_STREAM, WRTC_REMOVE_TRACK, UPDATE_STREAM_VOLUMES } from "../../helpers/enums"

const initialState = {
    orientation: 'portrait',
    wsConnectionState: WSCONNECTING,
    wrtcConnectionState: WRTC_DISCONNECTED,
    currentLocation: new Map(),
    peerLocations: new Map(),
    incomingStreams: new Array(),
    streamVolumes: new Map()
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
            return state
        case WRTC_REMOVE_TRACK:
            streams = state.incomingStreams.filter(stream => stream.id != action.payload)
            state.streamVolumes.delete(action.payload)
            return {...state, incomingStreams: streams}
        case WRTC_ADD_STREAM:
            return {...state, incomingStreams: action.payload}
        case UPDATE_STREAM_VOLUMES:
            state.streamVolumes.set(action.payload.UUID, action.payload.Volume)
            return state
        default:
            return state
    }
}