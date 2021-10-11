import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { WebSocketContext } from '../services/websocket';



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
        </View>
    );
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(ControlsView);
// export default ControlsView