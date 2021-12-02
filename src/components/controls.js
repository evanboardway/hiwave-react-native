import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { WRTC_CONNECTION_REQUESTED, WSCONNECTED, WS_SEND_MESSAGE, WSCONNECTING, WSFAILED, WRTC_CONNECTING, WRTC_ADD_TRACK, WRTC_CONNECTED, WRTC_DISCONNECT, WRTC_UPDATE_CONNECTION_STATE, WRTC_CONNECT, WRTC_MUTE } from '../helpers/enums';
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
                <View style={styles.voxBut}>
                    <Button
                        title={"VOICE"}
                        color='rgba(255, 255, 255, 0.7)'
                        onPress={() => {
                            props.dispatch({
                                type: WS_SEND_MESSAGE,
                                payload: {
                                    event: "voice"
                                }
                            })
                        }}
                    />
                </View>

                <View style={styles.muteBut}>
                    <Button
                        title={"MUTE"}
                        color='rgba(255, 255, 255, 0.7)'
                        onPress={() => {
                            props.dispatch({
                                type: WRTC_MUTE
                            })
                        }}
                    />
                </View>

            </View>
            <View style={styles.conButton}>
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
    voxBut: {
        backgroundColor: BUTTON_ACCENT,
        marginVertical: 7,
        marginLeft: 7,
        borderRadius: 10,
        borderBottomEndRadius: 100,
        shadowRadius: 20,
        shadowOpacity: 0.3,
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center'
    },
    muteBut: {
        backgroundColor: BUTTON_ACCENT,
        marginVertical: 7,
        marginRight: 7,
        borderRadius: 10,
        borderTopStartRadius: 100,
        shadowRadius: 20,
        shadowOpacity: 0.3,
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center'
    },
    conButton: {
        backgroundColor: BUTTON_ACCENT,
        margin: 7,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
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
