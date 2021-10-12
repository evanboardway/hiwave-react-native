import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import { WSCONNECTED, WSCONNECTING, WSFAILED } from '../helpers/enums';
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

const ControlsView = (props) => {

    const socket = useContext(WebSocketContext)

    const sendMessage = () => {
        socket.sendMessage("connect webrtc", "hi")
    }

    return (
        <View styles={styles.controls}>
            <View style={styles.connectButton}>
                <Button
                    onPress={sendMessage}
                    title="CONNECT"
                    color='rgba(255, 255, 255, 0.7)'
                />
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
    return { wsConnectionState: state.wsConnectionState }
};
const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps);
export default connectComponent(ControlsView);
