import { WSCONNECTED, WSCONNECT, UPDATE_WSCONNECTIONSTATE, WSCONNECTING, WSFAILED, WS_SEND_MESSAGE } from "../../helpers/enums";

let ws = null
let timeout = 400


isConnected = () => {
    if (!ws || ws.readyState == WebSocket.CLOSED) this.wsConnect(); //check if websocket instance is closed, if so call `connect` function.
};

export const websocketMiddleware = store => next => action => {
    const { dispatch } = store;

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
                console.log(message.event)
                // dispatch accordingly
                switch (message.event) {
                    case "wrtc_offer":

                    case "wrtc_candidate":
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