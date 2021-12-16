import { WSCONNECTED, START_LOCATION_SERVICE, UPDATE_PEER_LOCATION, WSCONNECT, UPDATE_WSCONNECTIONSTATE, WSCONNECTING, WSFAILED, WS_SEND_MESSAGE, WRTC_OFFER, WRTC_ANSWER, WRTC_ICE_CANDIDATE, WRTC_DISCONNECT, WRTC_RENEGOTIATION, WRTC_RENEGOTIATION_NEEDED, WRTC_RENEGOTIATE, STOP_LOCATION_SERVICE, PEER_LOCATION, ADJUST_PEER_VOLUME, WRTC_CANDIDATAE, WRTC_FAILED, CLIENT_RESET, WRTC_REMOVE_STREAM, PEER_DISCONNECTED } from "../../helpers/enums";

let ws = null
let timeout = 2500

export const websocketMiddleware = store => next => action => {
    const { dispatch } = store

    let connectionInterval

    switch (action.type) {
        case WSCONNECT:
            // socket = new WebSocket("ws://192.168.4.25:5000/websocket")
            socket = new WebSocket("ws://192.168.238.229:5000/websocket")


            socket.onopen = () => {
                clearTimeout(connectionInterval)
                ws = socket
                dispatch({
                    type: UPDATE_WSCONNECTIONSTATE,
                    payload: WSCONNECTED
                })
                dispatch({
                    type: START_LOCATION_SERVICE
                })
            }

            socket.onmessage = (e) => {
                message = JSON.parse(e.data)
                console.log("RECEIVED: ", message.event)

                // dispatch accordingly
                switch (message.event) {
                    case WRTC_ANSWER:
                        dispatch({
                            type: WRTC_ANSWER,
                            payload: message.data
                        })
                        break
                    case WRTC_CANDIDATAE:
                        dispatch({
                            type: WRTC_ICE_CANDIDATE,
                            payload: message.data
                        })
                        break
                    case WRTC_RENEGOTIATION_NEEDED:
                        dispatch({
                            type: WRTC_RENEGOTIATE,
                            payload: message.data
                        })
                        break
                    case WRTC_FAILED:
                        console.log("RECEIVED: wrtc connection state failed. Disconnecting.")
                        dispatch({
                            type: WRTC_DISCONNECT
                        })
                        break
                    case WRTC_REMOVE_STREAM:
                        dispatch({
                            type: WRTC_REMOVE_STREAM,
                            payload: message.data
                        })
                        break
                    case PEER_LOCATION:
                        dispatch({
                            type: UPDATE_PEER_LOCATION,
                            payload: JSON.parse(message.data)
                        })
                        break
                    case CLIENT_RESET:
                        dispatch({
                            type: CLIENT_RESET
                        })
                        break
                    case PEER_DISCONNECTED:
                        dispatch({
                            type: PEER_DISCONNECTED,
                            payload: message.data
                        })
                    default:
                        console.log("Caught unrecognized message: ", message.data)
                }
            }

            socket.onerror = () => {
                socket.close()
                dispatch({
                    type: UPDATE_WSCONNECTIONSTATE,
                    payload: WSFAILED
                })
            }

            socket.onclose = () => {
                ws = null
                dispatch({
                    type: CLIENT_RESET
                })

                dispatch({
                    type: UPDATE_WSCONNECTIONSTATE,
                    payload: WSCONNECTING
                })
                dispatch({
                    type: STOP_LOCATION_SERVICE
                })

                connectionInterval = setTimeout(() => {
                    if (!ws || ws.readyState == WebSocket.CLOSED) {
                        dispatch({
                            type: WSCONNECT
                        })
                    }
                }, timeout)
            }

            break

        case WS_SEND_MESSAGE:
            let payload = JSON.stringify(action.payload)
            console.log("Sent:", action.payload.event)
            if (ws) { ws.send(payload) }
            break

        default:
            next(action)
    }
}