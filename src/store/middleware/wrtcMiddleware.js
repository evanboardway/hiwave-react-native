import { UPDATE_WRTC_CONNECTION_STATE, WRTC_ADD_TRACK, WRTC_ANSWER, WRTC_CONNECT, WRTC_CONNECTED, WRTC_CONNECTING, WRTC_CONNECTION_REQUESTED, WRTC_DISCONNECT, WRTC_DISCONNECTED, WRTC_ICE_CANDIDATE, WRTC_OFFER, WRTC_RENEGOTIATION, WRTC_UPDATE_CONNECTION_STATE, WS_SEND_MESSAGE } from "../../helpers/enums"
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


let peerConnection

const configuration = {
    iceServers: [
        { "url": "stun:stun.stunprotocol.org" }
    ]
}

export const webrtcMiddleware = store => next => action => {
    const { dispatch } = store
    switch (action.type) {
        case WRTC_ADD_TRACK:
            mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
                // console.log(stream)
                peerConnection.addStream(stream)
            }).catch(err => console.log("ERR WITH STREAM", err))

            break
        case WRTC_DISCONNECT:
            if (peerConnection) peerConnection.close()
            dispatch({
                type: WRTC_UPDATE_CONNECTION_STATE,
                payload: WRTC_DISCONNECTED
            })
            break
        case WRTC_CONNECT:
            peerConnection = new RTCPeerConnection(configuration)

            mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
                // peerConnection.addStream(stream)


                // peerConnection.createDataChannel("yeet")
                // console.log(stream._tracks)

                peerConnection.addTransceiver(stream._tracks[0], {}).then(succ => console.log("TRANC: ", succ)).catch(err => console.log("TRANC ERR: ", err))

                peerConnection.onicecandidate = (e) => {
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
                // peerConnection.onnegotiationneeded = () => {
                //     peerConnection.createOffer().then(offer => {
                //         ldesc = new RTCSessionDescription(offer)
                //         peerConnection.setLocalDescription(ldesc)
                //         dispatch({
                //             type: WS_SEND_MESSAGE,
                //             payload: {
                //                 Event: WRTC_RENEGOTIATION,
                //                 Data: JSON.stringify(ldesc)
                //             }
                //         })
                //     }).catch(err => console.log("NEG NEED C OFF: ", err))
                // }

                peerConnection.onconnectionstatechange = (e) => {
                    console.log("STATE CHANGE")
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

                peerConnection.createOffer().then(offer => {
                    ldesc = new RTCSessionDescription(offer)
                    peerConnection.setLocalDescription(ldesc)
                    // console.log("OFFER PAYLOAD ", ldesc)

                    dispatch({
                        type: WS_SEND_MESSAGE,
                        payload: {
                            event: WRTC_OFFER,
                            data: JSON.stringify(ldesc)
                        }
                    })
                })

                dispatch({
                    type: WRTC_UPDATE_CONNECTION_STATE,
                    payload: WRTC_CONNECTING
                })

            })


            break

        case WRTC_ANSWER:
            rdesc = new RTCSessionDescription(JSON.parse(action.payload))
            // console.log("ANSWER PAYLOAD ", JSON.parse(action.payload))
            peerConnection.setRemoteDescription(rdesc).catch(err => {
                console.log(err.message),
                    dispatch({
                        type: WRTC_DISCONNECT
                    })
            })
            break
        case WRTC_ICE_CANDIDATE:
            candidate = new RTCIceCandidate(JSON.parse(action.payload))
            // console.log(action.payload)
            peerConnection.addIceCandidate(candidate).then(resp => {
                // console.log(resp)
            }).catch(fail => console.log(fail))
            break
        case WRTC_RENEGOTIATION:
            console.log("RENEGO: ", action.payload)
            break
        default:
            next(action)
    }
}