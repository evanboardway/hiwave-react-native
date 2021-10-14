import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';
import { WSCONNECTING, UPDATE_WSCONNECTIONSTATE, WSCONNECTED, WSFAILED, WRTC_OFFER_RECEIVED } from '../helpers/enums'
import HomeWrapper from '../components/wrapper'


// TODO: Turn this into a stateful component with class notation

// export const WebSocketContext = createContext({})

// export { WebSocketContext }

timeout = 400

class WebSocketWrapper extends React.Component {

    state = {
        socket: null,
        send: this.sendMessage
    }

    componentDidMount() {
        this.wsConnect()
    }

    wsConnect = () => {

        let that = this
        let connectionInterval

        socket = new WebSocket("ws://localhost:5000/websocket")

        socket.onopen = (e) => {
            this.setState({ socket: socket, send: this.sendMessage })
            that.timeout = 400
            clearTimeout(connectionInterval)
            this.props.dispatch({
                type: UPDATE_WSCONNECTIONSTATE,
                payload: WSCONNECTED
            })
        }
        socket.onmessage = (e) => {
            message = JSON.parse(e.data)
            console.log(e)
            switch (message.event) {
                case "wrtc_offer":
                    this.props.dispatch({
                        type: WRTC_OFFER_RECEIVED,
                        payload: message.data
                    })
                case "wrtc_candidate":
                    console.log("CANDIDATE")
            }
        }
        socket.onerror = (e) => {
            this.props.dispatch({
                type: UPDATE_WSCONNECTIONSTATE,
                payload: WSFAILED
            })
            socket.close()
        }
        socket.onclose = (e) => {
            this.props.dispatch({
                type: UPDATE_WSCONNECTIONSTATE,
                payload: WSCONNECTING
            })

            that.timeout += that.timeout
            connectionInterval = setTimeout(this.isConnected, Math.min(10000, that.timeout))
        }

    }

    isConnected = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState == WebSocket.CLOSED) this.wsConnect(); //check if websocket instance is closed, if so call `connect` function.
    };

    sendMessage(type, data = "") {
        console.log("SENT " + type)
        const raw = {
            event: type,
            data, data
        }
        payload = JSON.stringify(raw)
        this.socket.send(payload)
        // dispatch any updates you need
    }

    render() {
        return (
            <HomeWrapper ws={this.state}></HomeWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => ({})
const connectComponent = connect(mapDispatchToProps)
export default connectComponent(WebSocketWrapper)



// export default ({ children }) => {
//     let socket
//     let socketWrapper

//     const dispatch = useDispatch();

    // const wsConnect = () => {
    //     socket = new WebSocket("ws://localhost:5000/websocket")

    //     socket.onopen = (e) => {
    //         dispatch({
    //             type: UPDATE_WSCONNECTIONSTATE,
    //             payload: WSCONNECTED
    //         })
    //     }
    //     socket.onmessage = (e) => {
    //         message = JSON.parse(e.data)
    //         console.log(e)
    //         switch(message.event) {
    //             case "wrtc_offer":
    //                 dispatch({ 
    //                     type: WRTC_OFFER_RECEIVED,
    //                     payload: message.data                       
    //                 })
    //             case "wrtc_candidate":
    //                 console.log("CANDIDATE")
    //         }
    //     }
    //     socket.onerror = (e) => {
    //         dispatch({
    //             type: UPDATE_WSCONNECTIONSTATE,
    //             payload: WSFAILED
    //         })
    //         socket.close()
    //     }
    //     socket.onclose = (e) => {
    //         dispatch({
    //             type: UPDATE_WSCONNECTIONSTATE,
    //             payload: WSCONNECTING
    //         })
    //     }


    //     return socket
    // }

    // const sendMessage = (type, data) => {
    //     console.log("SENT " + type)
    //     const raw = {
    //         event: type,
    //         data, data
    //     }
    //     payload = JSON.stringify(raw)
    //     socket.send(payload)
    //     // dispatch any updates you need
    // }

//     if (!socket) {
//         socket = wsConnect()
//     }


//     socketWrapper = {
//         socket: socket,
//         sendMessage
//     }

    // return (
    //     < WebSocketContext.Provider value={socketWrapper} >
    //         {children}
    //     </WebSocketContext.Provider >
    // )
// }