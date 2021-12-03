import { ORIENTATION_CHANGE, WSCONNECTED, WSCONNECTING, WSCONNECT, UPDATE_PEER_LOCATION, UPDATE_WSCONNECTIONSTATE, WRTC_REMOVE_STREAM, WRTC_DISCONNECTED, UPDATE_WRTC_CONNECTION_STATE, WRTC_UPDATE_CONNECTION_STATE, UPDATE_LOCATION, WRTC_ADD_STREAM, WRTC_REMOVE_TRACK, UPDATE_STREAM_VOLUMES, CLIENT_RESET, WRTC_SET_LOCAL_STREAM, WRTC_MUTE } from "../../helpers/enums"

const initialState = {
    orientation: 'portrait',
    wsConnectionState: WSCONNECTING,
    wrtcConnectionState: WRTC_DISCONNECTED,
    currentLocation: new Map(),
    peerLocations: new Map(),
    localStream: null,
    incomingStreams: new Array(),
    muted: false
}

export function rootReducer(state = initialState, action) {
    switch(action.type) {
        case CLIENT_RESET:
            return {...state, incomingStreams: new Array(), peerLocations: new Map(), currentLocation: new Map()}
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
        case WRTC_SET_LOCAL_STREAM:
            return {...state, localStream: action.payload}
        case WRTC_REMOVE_TRACK:
            streams = state.incomingStreams.filter(stream => stream.id != action.payload)
            state.peerLocations.delete(action.payload)
            return {...state, incomingStreams: streams}
        case WRTC_DISCONNECTED:
            return {...state, incomingStreams: new Array(), peerLocations: new Map()}
        case WRTC_ADD_STREAM:
            return {...state, incomingStreams: action.payload}
        case UPDATE_STREAM_VOLUMES:
            state.incomingStreams.forEach(stream => {
                if (stream.id == action.payload.UUID) {
                    stream.setVolume(action.payload.Volume)
                }
            })
            return state
        case WRTC_MUTE:
            return {...state, muted: state.muted ? false : true}
        default:
            return state
    }
}