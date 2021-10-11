import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {
    let socket;
    let socketWrapper;

    const dispatch = useDispatch();

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
        socket = new WebSocket("ws://localhost:5000/websocket")
        
        socket.onopen = (e) => {
            console.log("OPEN")
            sendMessage("Message", "TESTING")
        }
        socket.onmessage = (e) => {
            console.log("MESSAGE")
            console.log(e)
        }
        socket.onerror = (e) => {
            console.log("ERROR")
        }
        socket.onclose = (e) => {
            console.log("CLOSE")
        }

        socketWrapper = {
            socket: socket,
            sendMessage
        }

    }

    return (
        < WebSocketContext.Provider value={socketWrapper} >
            {children}
        </WebSocketContext.Provider >
    )
}