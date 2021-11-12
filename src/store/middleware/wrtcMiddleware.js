import { UPDATE_WRTC_CONNECTION_STATE, WRTC_ADD_STREAM, WRTC_ADD_TRACK, WRTC_ANSWER, WRTC_CONNECT, WRTC_CONNECTED, WRTC_CONNECTING, WRTC_CONNECTION_REQUESTED, WRTC_DISCONNECT, WRTC_DISCONNECTED, WRTC_ICE_CANDIDATE, WRTC_OFFER, WRTC_RENEGOTIATE, WRTC_RENEGOTIATION, WRTC_RENEGOTIATION_NEEDED, WRTC_UPDATE_CONNECTION_STATE, WS_SEND_MESSAGE } from "../../helpers/enums"
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
    ],
    sdpSemantics: "unified-plan"
}

export const webrtcMiddleware = store => next => action => {
    const { dispatch } = store
    switch (action.type) {
        case WRTC_ADD_TRACK:
            mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
                peerConnection.addStream(stream)
            }).catch(err => console.log("ERR WITH STREAM", err))

            break
        case WRTC_DISCONNECT:
            if (peerConnection) peerConnection.close()
            peerConnection = null
            dispatch({
                type: WRTC_UPDATE_CONNECTION_STATE,
                payload: WRTC_DISCONNECTED
            })
            break
        case WRTC_ANSWER:
            rdesc = new RTCSessionDescription(JSON.parse(action.payload))
            console.log(rdesc)
            peerConnection.setRemoteDescription(rdesc).catch(err => {
                console.log(err.message),
                    dispatch({
                        type: WRTC_DISCONNECT
                    })
            })
            break
        case WRTC_ICE_CANDIDATE:
            if (peerConnection) {
                candidate = new RTCIceCandidate(JSON.parse(action.payload))
                peerConnection.addIceCandidate(candidate).then(resp => {
                }).catch(fail => console.log(fail))
            }
            break
        case WRTC_RENEGOTIATE:
            console.log("renegotiating")
            if (peerConnection.signalingState != "stable") {
                return
            }
            rdesc = new RTCSessionDescription(JSON.parse(action.payload))
            peerConnection.setRemoteDescription(rdesc).then(() => {
                console.log("set remote desc\n", rdesc)
                peerConnection.createAnswer().then(answer => {
                    peerConnection.setLocalDescription(answer).then(() => {
                        dispatch({
                            type: WS_SEND_MESSAGE,
                            payload: {
                                Event: WRTC_ANSWER,
                                Data: JSON.stringify(answer)
                            }
                        })
                    })
                })
            }).catch(err => {
                console.log(err.message),
                    dispatch({
                        type: WRTC_DISCONNECT
                    })
            })
            break
        case WRTC_CONNECT:
            peerConnection = new RTCPeerConnection(configuration)

            mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {

                peerConnection.addTransceiver(stream._tracks[0], {}).then(() => {


                }).catch(err => console.log("TRANC ERR: ", err))

                // peerConnection.onnegotiationneeded = () => {
                //     console.log("onrenegotiationneeded", peerConnection.signalingState)
                //     peerConnection.createOffer().then(offer => {
                //         if (peerConnection.signalingState != "stable") return
                //         ldesc = new RTCSessionDescription(offer)
                //         peerConnection.setLocalDescription(ldesc).then(() => {
                //             dispatch({
                //                 type: WS_SEND_MESSAGE,
                //                 payload: {
                //                     Event: WRTC_RENEGOTIATION_NEEDED,
                //                     Data: JSON.stringify(ldesc)
                //                 }
                //             })

                //         })
                //     }).catch(err => console.log("NEG NEED C OFF: ", err))
                // }


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

                peerConnection.onaddstream = (e) => {
                    console.log("ONADDSTREAM", e.currentTarget._remoteStreams)
                    dispatch({
                        type: WRTC_ADD_STREAM,
                        payload: e.currentTarget._remoteStreams
                    })
                }


                peerConnection.onconnectionstatechange = (e) => {
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

                    console.log("connection state change:", e.currentTarget.connectionState)
                    dispatch({
                        type: WRTC_UPDATE_CONNECTION_STATE,
                        payload: conState
                    })
                }

                peerConnection.createOffer().then(offer => {
                    ldesc = new RTCSessionDescription(offer)
                    peerConnection.setLocalDescription(ldesc).then(() => {
                        dispatch({
                            type: WS_SEND_MESSAGE,
                            payload: {
                                event: WRTC_OFFER,
                                data: JSON.stringify(peerConnection.localDescription)
                            }
                        })
                    })
                    // console.log("OFFER PAYLOAD ", ldesc)
                })

                dispatch({
                    type: WRTC_UPDATE_CONNECTION_STATE,
                    payload: WRTC_CONNECTING
                })

            })
            break
        default:
            next(action)
    }
}