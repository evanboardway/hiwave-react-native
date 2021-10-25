import { WSCONNECTED, WSCONNECT, UPDATE_WSCONNECTIONSTATE, WSCONNECTING, WSFAILED, WS_SEND_MESSAGE, WRTC_OFFER, WRTC_ANSWER, WRTC_ICE_CANDIDATE, WRTC_DISCONNECT, WRTC_RENEGOTIATION, WRTC_RENEGOTIATION_NEEDED, WRTC_RENEGOTIATE } from "../../helpers/enums";

let ws = null
let timeout = 2500

export const websocketMiddleware = store => next => action => {
    const { dispatch } = store

    let connectionInterval

    switch (action.type) {
        case WSCONNECT:
            socket = new WebSocket("ws://localhost:5000/websocket")

            socket.onopen = () => {
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
            break

        default:
            next(action)
    }
}