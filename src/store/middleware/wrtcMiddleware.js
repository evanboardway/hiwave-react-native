import { UPDATE_WRTC_CONNECTION_STATE, WRTC_ANSWER, WRTC_CONNECT, WRTC_CONNECTED, WRTC_CONNECTING, WRTC_CONNECTION_REQUESTED, WRTC_DISCONNECT, WRTC_DISCONNECTED, WRTC_ICE_CANDIDATE, WRTC_OFFER, WRTC_RENEGOTIATION, WRTC_UPDATE_CONNECTION_STATE, WS_SEND_MESSAGE } from "../../helpers/enums"
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCIceCandidateType,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc'


let peerConnecton = null

const configuration = {
    iceServers: [
        { "url": "stun:stun.stunprotocol.org" }
    ]
}

export const webrtcMiddleware = store => next => action => {
    const { dispatch } = store
    switch (action.type) {
        case WRTC_DISCONNECT:
            peerConnecton.close()
            dispatch({
                type: WRTC_UPDATE_CONNECTION_STATE,
                payload: WRTC_DISCONNECTED
            })
            break
        case WRTC_CONNECT:
            peerConnecton = new RTCPeerConnection(configuration)

            peerConnecton.createDataChannel("yeet")

            mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => peerConnecton.addStream(stream)).catch(err => console.log("ERR WITH STREAM"))

            peerConnecton.onicecandidate = (e) => {
                if (e.candidate) {
                    dispatch({
                        type: WS_SEND_MESSAGE,
                        payload: {
                            event: WRTC_ICE_CANDIDATE,
                            data: JSON.stringify(e.candidate)
                        }
                    })
                }
            }

            // Messes up the local sdp for now.
            // peerConnecton.onnegotiationneeded = () => {
            //     peerConnecton.createOffer().then(offer => {
            //         peerConnecton.setLocalDescription(offer)
            //         dispatch({
            //             type: WS_SEND_MESSAGE,
            //             data: {
            //                 Event: WRTC_RENEGOTIATION,
            //                 Data: JSON.stringify(offer)
            //             }
            //         })
            //     })
            // }

            peerConnecton.onconnectionstatechange = (e) => {
                let conState
                switch (e.currentTarget.connectionState) {
                    case "connecting":
                        conState = WRTC_CONNECTING
                        break;

                    case "connected":
                        conState = WRTC_CONNECTED
                        break;
                    default:
                        conState = WRTC_DISCONNECTED
                        break;
                }

                console.log("connection state change ", e.currentTarget.connectionState)
                dispatch({
                    type: WRTC_UPDATE_CONNECTION_STATE,
                    payload: conState
                })
            }

            peerConnecton.createOffer().then(offer => {
                ldesc = new RTCSessionDescription(offer)
                peerConnecton.setLocalDescription(ldesc)
                console.log("OFFER PAYLOAD ", ldesc)

                dispatch({
                    type: WS_SEND_MESSAGE,
                    payload: {
                        event: WRTC_OFFER,
                        data: JSON.stringify(offer)
                    }
                })
            })

            dispatch({
                type: WRTC_UPDATE_CONNECTION_STATE,
                payload: WRTC_CONNECTING
            })

            break

        case WRTC_ANSWER:
            rdesc = new RTCSessionDescription(JSON.parse(action.payload))
            console.log("ANSWER PAYLOAD ", JSON.parse(action.payload))
            peerConnecton.setRemoteDescription(rdesc).then(resp => console.log(resp))
            break
        case WRTC_ICE_CANDIDATE:
            candidate = new RTCIceCandidate(JSON.parse(action.payload))
            // console.log(action.payload)
            peerConnecton.addIceCandidate(candidate).then(resp => {
                // console.log(resp)
            }).catch(fail => console.log(fail))
            break
        // case WRTC_RENEGOTIATION:
        //     console.log("RENEGO: ", action.payload)
        //     break
        default:
            next(action)
    }
}