import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { WRTC_CONNECTION_REQUESTED, WSCONNECTED, WSCONNECTING, WSFAILED, WRTC_UPDATE_CONNECTION_STATE } from '../helpers/enums';
import { WebSocketContext } from '../services/websocket';
import { OVERLAY_1, OVERLAY_2, BUTTON_ACCENT, DARK_THEME } from '../assets/themes';

const buttonText = (wsConnectionState) => {
    switch (wsConnectionState) {
        case WSCONNECTING:
            return "connecting"
        case WSCONNECTED:
            return "connected"
        case WSFAILED:
            return "failed"
        default:
            return "idk whats happening"
    }
}

const renderConnectButton = (props) => {
    const socket = useContext(WebSocketContext)

    console.log(props.wrtcOffer)

    const requestConnection = () => {
        socket.sendMessage("wrtc_connect", "")
        props.dispatch({
            type: WRTC_UPDATE_CONNECTION_STATE,
            payload: WRTC_CONNECTION_REQUESTED
        })
    }

    switch (props.wrtcConnectionState) {
        case WRTC_CONNECTION_REQUESTED:
            return (<Button
                onPress={requestConnection}
                title="..."
                color='rgba(255, 255, 255, 0.7)'
                disabled={true}
            />)
        default:
            return (<Button
                onPress={requestConnection}
                title="CONNECT"
                color='rgba(255, 255, 255, 0.7)'
            />)
    }
}

const ControlsView = (props) => {
    return (
        <View styles={styles.controls}>
            <View style={styles.connectButton}>
                {renderConnectButton(props)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    connectButton: {
        backgroundColor: BUTTON_ACCENT,
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        shadowRadius: 20,
        shadowOpacity: 0.1
    },
    controls: {}
})

const mapStateToProps = (state) => {
    return {
        wsConnectionState: state.wsConnectionState,
        wrtcConnectionState: state.wrtcConnectionState,
        wrtcOffer: state.wrtcOffer
    }
};
// const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps);
export default connectComponent(ControlsView);
