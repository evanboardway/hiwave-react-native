import React, { Component, createContext } from 'react';
import { connect, useDispatch } from 'react-redux';
import { WSCONNECTING, UPDATE_WSCONNECTIONSTATE, WSCONNECTED, WSFAILED, WRTC_OFFER_RECEIVED } from '../helpers/enums'

// TODO: MAKE SURE THAT REFRESHING THE REDUX STORE DOESNT REFRESH THE CONNECTION

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {
    let socket
    let socketWrapper

    const dispatch = useDispatch();

    const wsConnect = () => {
        socket = new WebSocket("ws://localhost:5000/websocket")

        socket.onopen = (e) => {
            // sendMessage("ping", "pong")
            dispatch({
                type: UPDATE_WSCONNECTIONSTATE,
                payload: WSCONNECTED
            })
        }
        socket.onmessage = (e) => {
            message = JSON.parse(e.data)
            console.log(e)
            switch(message.event) {
                case "wrtc_offer":
                    dispatch({ 
                        type: WRTC_OFFER_RECEIVED,
                        payload: message.data                       
                    })
                case "wrtc_candidate":
                    console.log("CANDIDATE")
            }
        }
        socket.onerror = (e) => {
            dispatch({
                type: UPDATE_WSCONNECTIONSTATE,
                payload: WSFAILED
            })
            socket.close()
        }
        socket.onclose = (e) => {
            dispatch({
                type: UPDATE_WSCONNECTIONSTATE,
                payload: WSCONNECTING
            })
        }


        return socket
    }

    const sendMessage = (type, data) => {
        console.log("SENT " + type)
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