import { ORIENTATION_CHANGE, WSCONNECTED, WSCONNECTING, WSCONNECT, UPDATE_PEER_LOCATION, UPDATE_WSCONNECTIONSTATE, WRTC_REMOVE_STREAM, WRTC_DISCONNECTED, UPDATE_WRTC_CONNECTION_STATE, WRTC_UPDATE_CONNECTION_STATE, UPDATE_LOCATION, WRTC_ADD_STREAM, UPDATE_STREAM_VOLUMES, CLIENT_RESET, WRTC_SET_LOCAL_STREAM, WRTC_MUTE, SELECTABLE_AVATAR_MENU_HIDDEN, TOGGLE_SELECTABLE_AVATAR_MENU_HIDDEN, AVATAR_BIKE, SET_CURRENT_AVATAR } from "../../helpers/enums"

const initialState = {
    orientation: 'portrait',
    wsConnectionState: WSCONNECTING,
    wrtcConnectionState: WRTC_DISCONNECTED,
    currentLocation: new Map(),
    peerLocations: new Array(),
    localStream: null,
    incomingStreams: new Array(),
    muted: false,
    selectableAvatarMenuHidden: true,
    currentAvatar: AVATAR_BIKE
}

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "test":
            console.log("TRIGGERED PEER LOX", state.peerLocations)
            return state
        case CLIENT_RESET:
            return { ...state, incomingStreams: new Array(), peerLocations: new Map(), currentLocation: new Map(), muted: false, selectableAvatarMenuHidden: true }
        case ORIENTATION_CHANGE:
            return { ...state, orientation: action.payload }
        case UPDATE_WSCONNECTIONSTATE:
            return { ...state, wsConnectionState: action.payload }
        case WRTC_UPDATE_CONNECTION_STATE:
            return { ...state, wrtcConnectionState: action.payload }
        case UPDATE_LOCATION:
            return { ...state, currentLocation: action.payload }
        case UPDATE_PEER_LOCATION:
            return {
                ...state, peerLocations: state.peerLocations.push(
                    {
                        UUID: action.payload.UUID,
                        location: action.payload.Location
                    }
                )
            }
        case WRTC_SET_LOCAL_STREAM:
            return { ...state, localStream: action.payload }
        case WRTC_ADD_STREAM:
            state.incomingStreams.push(action.payload)
            return state
        case WRTC_REMOVE_STREAM:
            streams = state.incomingStreams.filter(stream => stream.id != action.payload)
            state.peerLocations.delete(action.payload)
            return { ...state, incomingStreams: streams }
        case WRTC_DISCONNECTED:
            return { ...state, incomingStreams: new Array(), peerLocations: new Map() }
        case UPDATE_STREAM_VOLUMES:
            state.incomingStreams.forEach(stream => {
                if (stream.id == action.payload.UUID) {
                    stream.setVolume(action.payload.Volume)
                }
            })
            return state
        case WRTC_MUTE:
            return { ...state, muted: state.muted ? false : true }
        case TOGGLE_SELECTABLE_AVATAR_MENU_HIDDEN:
            return { ...state, selectableAvatarMenuHidden: state.selectableAvatarMenuHidden ? false : true }
        case SET_CURRENT_AVATAR:
            return { ...state, currentAvatar: action.payload }
        default:
            return state
    }
}