import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { WSCONNECTED, WSCONNECTING, WSFAILED } from '../helpers/enums';
import { WebSocketContext } from '../services/websocket';

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
        <View>
            <Button
                onPress={sendMessage}
                title="Connect"
                color="#841584"
            />
            <Text>{buttonText(props.wsConnectionState)}</Text>
        </View>
    );
}

const mapStateToProps = (state) => {
    return { wsConnectionState: state.wsConnectionState }
};
const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps);
export default connectComponent(ControlsView);
// export default ControlsView