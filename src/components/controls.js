import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { UPDATE_AVATAR, AVATAR_BIKE, AVATAR_MOPED, AVATAR_MOTORCYCLE, AVATAR_SCOOTER, AVATAR_PIGGY, AVATAR_SNOWMOBILE, WRTC_CONNECTION_REQUESTED, WSCONNECTED, WS_SEND_MESSAGE, WSCONNECTING, WSFAILED, WRTC_CONNECTING, WRTC_ADD_TRACK, WRTC_CONNECTED, WRTC_DISCONNECT, WRTC_UPDATE_CONNECTION_STATE, WRTC_CONNECT, WRTC_MUTE, TOGGLE_SELECTABLE_AVATAR_MENU_HIDDEN } from '../helpers/enums';
import { OVERLAY_1, OVERLAY_2, BUTTON_ACCENT, DARK_THEME, MAPBOX_THEME, CONTROLS_THEME, CONTROLS_BUTTON, RED_ACCENT } from '../assets/themes';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const IMAGE_BIKE = require("../assets/images/bike.png")
const IMAGE_SNOWMOBILE = require("../assets/images/snowmobile.png")
const IMAGE_MOTORCYCLE = require("../assets/images/motorcycle.png")
const IMAGE_SCOOTER = require("../assets/images/scooter.png")
const IMAGE_MOPED = require("../assets/images/moped.png")
const IMAGE_PIGGY = require("../assets/images/piggy.png")

function avatarToImage(avatar) {
    switch(avatar) {
        case AVATAR_BIKE:
            return IMAGE_BIKE
        case AVATAR_MOPED:
            return IMAGE_MOPED
        case AVATAR_MOTORCYCLE:
            return IMAGE_MOTORCYCLE
        case AVATAR_PIGGY:
            return IMAGE_PIGGY
        case AVATAR_SCOOTER:
            return IMAGE_SCOOTER
        case AVATAR_SNOWMOBILE:
            return IMAGE_SNOWMOBILE
        default:
            return IMAGE_BIKE
    }
}

function RenderSelectableAvatar (props) {
    if (props.selectableAvatarMenuHidden) {
        return null
    } else {
        return (
            <View style={styles.iconSelectorContainer}>
                <TouchableOpacity
                    onPress={() => {
                        // props.dispatch({
                        //     type: UPDATE_AVATAR,
                        //     payload: AVATAR_BIKE
                        // })
                        props.dispatch({
                            type: WS_SEND_MESSAGE,
                            payload: {
                                event: "voice"
                            }
                        })
                    }}
                    style={styles.selectIconButtonContainer}>
                    <Image style={styles.iconImage} source={IMAGE_BIKE} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        // props.dispatch({
                        //     type: UPDATE_AVATAR,
                        //     payload: AVATAR_SNOWMOBILE
                        // })
                        props.dispatch({
                            type: WS_SEND_MESSAGE,
                            payload: {
                                event: "mute"
                            }
                        })
                    }}
                    style={styles.selectIconButtonContainer}>
                    <Image style={styles.iconImage} source={IMAGE_SNOWMOBILE} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        // props.dispatch({
                        //     type: UPDATE_AVATAR,
                        //     payload: AVATAR_MOTORCYCLE
                        // })
                        props.dispatch({
                            type: "test"
                        })
                    }}
                    style={styles.selectIconButtonContainer}>
                    <Image style={styles.iconImage} source={IMAGE_MOTORCYCLE} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.dispatch({
                            type: UPDATE_AVATAR,
                            payload: AVATAR_SCOOTER
                        })
                    }}
                    style={styles.selectIconButtonContainer}>
                    <Image style={styles.iconImage} source={IMAGE_SCOOTER} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.dispatch({
                            type: UPDATE_AVATAR,
                            payload: AVATAR_MOPED
                        })
                    }}
                    style={styles.selectIconButtonContainer}>
                    <Image style={styles.iconImage} source={IMAGE_MOPED} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.dispatch({
                            type: UPDATE_AVATAR,
                            payload: AVATAR_PIGGY
                        })
                    }}
                    style={styles.selectIconButtonContainer}>
                    <Image style={styles.iconImage} source={IMAGE_PIGGY} />
                </TouchableOpacity>
            </View>
        )
    }
}

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
        <View style={styles.navigationContainer}>

            <RenderSelectableAvatar selectableAvatarMenuHidden={props.selectableAvatarMenuHidden} dispatch={props.dispatch}/>

            <View style={styles.controlsContainer}>

                <TouchableOpacity
                    onPress={() => {
                        props.dispatch({
                            type: TOGGLE_SELECTABLE_AVATAR_MENU_HIDDEN
                        })
                    }}>
                    <View style={styles.buttonContainer}>
                        <Image style={styles.image} source={avatarToImage(props.currentAvatar)} />
                    </View>
                </TouchableOpacity>

                <View style={styles.iconBacking}>
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
                        <View style={styles.connectButtonContainer}>
                            <Image style={styles.image} source={title == 'CONNECT' ? require('../assets/images/connect.png') : require('../assets/images/disconnect.png')} />
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        props.dispatch({
                            type: WRTC_MUTE
                        })
                    }}
                    disabled={title == 'DISCONNECT' ? false : true}
                >
                    <View style={styles.buttonContainer}>
                        <Image style={styles.image} source={props.muted ? require('../assets/images/muted.png') : require('../assets/images/unmuted.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navigationContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: CONTROLS_THEME,
        borderRadius: 20,
        bottom: 60,
        position: 'absolute',
        left: 0,
        right: 0,
    },
    iconSelectorContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10
    },
    controlsContainer: {
        backgroundColor: CONTROLS_THEME,
        borderRadius: 20,
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
    selectIconButtonContainer: {
        padding: 10,
        margin: 4,
    },
    connectButtonContainer: {
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
    iconImage: {
        height: 40,
        width: 40,
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
        muted: state.muted,
        selectableAvatarMenuHidden: state.selectableAvatarMenuHidden,
        currentAvatar: state.currentAvatar
    }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(ControlsView);
