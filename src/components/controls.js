import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { WRTC_CONNECTION_REQUESTED, WSCONNECTED, WSCONNECTING, WSFAILED, WRTC_UPDATE_CONNECTION_STATE } from '../helpers/enums';
import { OVERLAY_1, OVERLAY_2, BUTTON_ACCENT, DARK_THEME } from '../assets/themes';
import { WebSocketContext } from '../services/connection';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



// class ControlsView extends React.Component {

//     render() {
//         return (
//             <WebSocketContext.Consumer>
//                 {({ socket, send }) => (
//                     <View styles={styles.controls}>
//                         <View style={styles.connectButton}>
// <Button
//     onPress={() => {
//         send("wrtc_connect")
//         this.props.dispatch({
//             type: WRTC_UPDATE_CONNECTION_STATE,
//             payload: WRTC_CONNECTION_REQUESTED
//         })
//     }}
//     title={this.props.wrtcConnectionState == WRTC_CONNECTION_REQUESTED ? "..." : "CONNECT"}
//     color='rgba(255, 255, 255, 0.7)'
//     disabled={this.props.wrtcConnectionState == WRTC_CONNECTION_REQUESTED ? true : false}
// />
//                         </View>
//                     </View>
//                 )}
//             </WebSocketContext.Consumer>
//         )
//     }
// }

const ControlsView = (props) => {
    return (
        <Text>Controls</Text>
        // <Button
        //     onPress={() => {
        //         props.dispatch({
        //             type: WRTC_UPDATE_CONNECTION_STATE,
        //             payload: WRTC_CONNECTION_REQUESTED
        //         })
        //     }}
        //     title={this.props.wrtcConnectionState == WRTC_CONNECTION_REQUESTED ? "..." : "CONNECT"}
        //     color='rgba(255, 255, 255, 0.7)'
        //     disabled={this.props.wrtcConnectionState == WRTC_CONNECTION_REQUESTED ? true : false}
        // />
    )
}

const styles = StyleSheet.create({
    connectButton: {
        backgroundColor: BUTTON_ACCENT,
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 100,
        shadowRadius: 20,
        shadowOpacity: 0.3
    },
    controls: {}
})

const mapStateToProps = (state) => {
    return {
        wsConnectionState: state.wsConnectionState,
        wrtcConnectionState: state.wrtcConnectionState,
    }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(ControlsView);
