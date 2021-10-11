import React, { createContext } from 'react';
import { connect, useDispatch } from 'react-redux';
import { WSCONNECTING, UPDATE_WSCONNECTIONSTATE, WSCONNECTED, WSFAILED } from '../helpers/enums'

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {
    let socket;
    let socketWrapper;

    const dispatch = useDispatch();

    const wsConnect = () => {
        socket = new WebSocket("ws://localhost:5000/websocket")

        socket.onopen = (e) => {
            dispatch({
                type: UPDATE_WSCONNECTIONSTATE,
                payload: WSCONNECTED
            })
        }
        socket.onmessage = (e) => {
            console.log("MESSAGE")
            console.log(e)
        }
        socket.onerror = (e) => {
            dispatch({
                type: UPDATE_WSCONNECTIONSTATE,
                payload: WSFAILED
            })
            socket.close()
            sleep(pingWait)
            // wsConnect()
        }
        socket.onclose = (e) => {
            dispatch({
                type: UPDATE_WSCONNECTIONSTATE,
                payload: WSFAILED
            })
            console.log("CLOSE")
            // wsConnect()
        }


        return socket
    }

    const sendMessage = (type, data) => {
        const raw = {
            event: type,
            data, data
        }
        payload = JSON.stringify(raw)
        socket.send(payload)
        // dispatch any updates you need
    }

    if (!socket) {
        socket = wsConnect()
    }

    socketWrapper = {
        socket: socket,
        sendMessage
    }

    return (
        < WebSocketContext.Provider value={socketWrapper} >
            {children}
        </WebSocketContext.Provider >
    )
}