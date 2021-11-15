import { WSCONNECTED, START_LOCATION_SERVICE, WSCONNECT, UPDATE_WSCONNECTIONSTATE, WSCONNECTING, WSFAILED, WS_SEND_MESSAGE, WRTC_OFFER, WRTC_ANSWER, WRTC_ICE_CANDIDATE, WRTC_DISCONNECT, WRTC_RENEGOTIATION, WRTC_RENEGOTIATION_NEEDED, WRTC_RENEGOTIATE, STOP_LOCATION_SERVICE } from "../../helpers/enums";

let ws = null
let timeout = 2500

export const websocketMiddleware = store => next => action => {
    const { dispatch } = store

    let connectionInterval

    switch (action.type) {
        case WSCONNECT:
            socket = new WebSocket("ws://192.168.4.25:5000/websocket")
            // socket = new WebSocket("ws://localhost:5000/websocket")

            socket.onopen = () => {
                store.dispatch({
                    type: START_LOCATION_SERVICE
                  })
                clearTimeout(connectionInterval)
                ws = socket
                dispatch({
                    type: UPDATE_WSCONNECTIONSTATE,
                    payload: WSCONNECTED
                })
            }

            socket.onmessage = (e) => {
                message = JSON.parse(e.data)
                console.log("RECEIVED: ", message.event)
                // dispatch accordingly
                switch (message.event) {
                    case "wrtc_answer":
                        dispatch({
                            type: WRTC_ANSWER,
                            payload: message.data
                        })
                        break
                    case "wrtc_candidate":
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
                    case "wrtc_failed":
                        console.log("RECEIVED: wrtc connection state failed. Disconnecting.")
                        dispatch({
                            type: WRTC_DISCONNECT
                        })
                        break
                    default:
                        console.log("Caught unrecognized message\n", message.data)
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
                dispatch({
                    type: WRTC_DISCONNECT
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
            ws.send(payload)
            console.log("Sent:", action.payload.event)
            break

        default:
            next(action)
    }
}