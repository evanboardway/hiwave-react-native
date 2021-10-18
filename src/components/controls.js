import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { WRTC_CONNECTION_REQUESTED, WSCONNECTED, WSCONNECTING, WSFAILED, WRTC_CONNECTING, WRTC_ADD_TRACK, WRTC_CONNECTED, WRTC_DISCONNECT, WRTC_UPDATE_CONNECTION_STATE, WRTC_CONNECT } from '../helpers/enums';
import { OVERLAY_1, OVERLAY_2, BUTTON_ACCENT, DARK_THEME } from '../assets/themes';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const ControlsView = (props) => {
    let title
    let disabled = false
    switch (props.wrtcConnectionState) {
        case WRTC_CONNECTING:
            title = "CONNECTING"
            disabled = true
            break
        case WRTC_CONNECTED:
            title = "DISCONNECT"
            break
        default:
            title = "CONNECT"
            break
    }
    return (
        <View style={styles.controlsContainer}>
            <View style={styles.secondaryControlsContainer}>
                <View style={styles.button}>
                    <Button
                        title={"VOICE"}
                        color='rgba(255, 255, 255, 0.7)'
                        onPress={() => {
                            props.dispatch({
                                type: WRTC_ADD_TRACK
                            })
                        }}
                    />
                </View>

                <View style={styles.button}>
                    <Button
                        title={"MUTE"}
                        color='rgba(255, 255, 255, 0.7)'
                    />
                </View>

            </View>
            <View style={styles.button}>
                <Button
                    onPress={() => {
                        if (props.wrtcConnectionState == WRTC_CONNECTED) {
                            props.dispatch({
                                type: WRTC_DISCONNECT
                            })
                        } else {
                            props.dispatch({
                                type: WRTC_CONNECT
                            })
                        }
                    }}
                    title={title}
                    color='rgba(255, 255, 255, 0.7)'
                    disabled={disabled}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: BUTTON_ACCENT,
        margin: 12,
        borderRadius: 30,
        shadowRadius: 20,
        shadowOpacity: 0.3,
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center'
    },
    controlsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    secondaryControlsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
})

const mapStateToProps = (state) => {
    return {
        wsConnectionState: state.wsConnectionState,
        wrtcConnectionState: state.wrtcConnectionState,
    }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(ControlsView);
