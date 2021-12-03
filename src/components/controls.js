import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { WRTC_CONNECTION_REQUESTED, WSCONNECTED, WS_SEND_MESSAGE, WSCONNECTING, WSFAILED, WRTC_CONNECTING, WRTC_ADD_TRACK, WRTC_CONNECTED, WRTC_DISCONNECT, WRTC_UPDATE_CONNECTION_STATE, WRTC_CONNECT, WRTC_MUTE } from '../helpers/enums';
import { OVERLAY_1, OVERLAY_2, BUTTON_ACCENT, DARK_THEME, MAPBOX_THEME, CONTROLS_THEME, CONTROLS_BUTTON, RED_ACCENT } from '../assets/themes';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
            <TouchableOpacity
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
                disabled={disabled}>
                <View style={styles.buttonContainer}>
                    <Image style={styles.image} source={title == 'CONNECT' ? require('../assets/images/connect.png') : require('../assets/images/disconnect.png')} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBacking}>
                <View style={styles.selectIconContainer}>
                    <Image style={styles.image} source={require('../assets/images/bike.png')} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    props.dispatch({
                        type: WRTC_MUTE
                    })
                }}
                disabled={title == 'DISCONNECT' ? false : true}
            >
                <View color={'white'} style={styles.buttonContainer}>
                    <Image style={styles.image} source={props.muted ? require('../assets/images/muted.png') : require('../assets/images/unmuted.png')} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    controlsContainer: {
        backgroundColor: CONTROLS_THEME,
        borderRadius: 20,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: 60
    },
    buttonContainer: {
        backgroundColor: CONTROLS_BUTTON,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    selectIconContainer: {
        backgroundColor: RED_ACCENT,
        borderRadius: 50,
        padding: 20,
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    image: {
        height: 25,
        width: 25,
        opacity: 1,
        resizeMode: 'contain',
    },
    buttonText: {
        color: RED_ACCENT,
        fontSize: 8
    },
    iconBacking: {
        backgroundColor: CONTROLS_THEME,
        padding: 10,
        borderRadius: 50,
    }
})

const mapStateToProps = (state) => {
    return {
        wsConnectionState: state.wsConnectionState,
        wrtcConnectionState: state.wrtcConnectionState,
        muted: state.muted
    }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(ControlsView);
