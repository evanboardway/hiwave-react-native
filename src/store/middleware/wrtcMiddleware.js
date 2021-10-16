import { WRTC_CONNECT, WRTC_CONNECTION_REQUESTED, WRTC_UPDATE_CONNECTION_STATE } from "../../helpers/enums"
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc'


let peerConnecton

const configuration = {
    iceServers: [
        { "url": "stun:stun.stunprotocol.org" }
    ]
}

export const webrtcMiddleware = store => next => action => {
    const { dispatch } = store

    switch (action.type) {
        case WRTC_CONNECT:
            peerConnecton = new RTCPeerConnection(configuration)

            peerConnecton.onicecandidate = (e) => {
                console.log(e)
            }
            dispatch({
                type: WRTC_UPDATE_CONNECTION_STATE,
                payload: WRTC_CONNECTION_REQUESTED
            })

        default:
            next(action)
    }
}