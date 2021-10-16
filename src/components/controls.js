import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { WRTC_CONNECTION_REQUESTED, WSCONNECTED, WSCONNECTING, WSFAILED, WRTC_UPDATE_CONNECTION_STATE, WRTC_CONNECT } from '../helpers/enums';
import { OVERLAY_1, OVERLAY_2, BUTTON_ACCENT, DARK_THEME } from '../assets/themes';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const ControlsView = (props) => {
    return (
        <View style={styles.connectButton}>
            <Button
                onPress={() => {
                    props.dispatch({
                        type: WRTC_CONNECT
                    })
                }}
                title={props.wrtcConnectionState == WRTC_CONNECTION_REQUESTED ? "..." : "CONNECT"}
                color='rgba(255, 255, 255, 0.7)'
                disabled={props.wrtcConnectionState == WRTC_CONNECTION_REQUESTED ? true : false}
            />
        </View>
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
