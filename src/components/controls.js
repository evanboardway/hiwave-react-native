import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { WRTC_CONNECTION_REQUESTED, WSCONNECTED, WSCONNECTING, WSFAILED, WRTC_UPDATE_CONNECTION_STATE } from '../helpers/enums';
import { OVERLAY_1, OVERLAY_2, BUTTON_ACCENT, DARK_THEME } from '../assets/themes';



class ControlsView extends React.Component {
    requestConnection = () => {
        this.props.ws.send("wrtc_connect")
        this.props.dispatch({
            type: WRTC_UPDATE_CONNECTION_STATE,
            payload: WRTC_CONNECTION_REQUESTED
        })
    }

    render() {
        return (
            <View styles={styles.controls}>
                <View style={styles.connectButton}>
                    <Button
                        onPress={this.requestConnection}
                        title="CONNECT"
                        color='rgba(255, 255, 255, 0.7)'
                        disabled={this.props.wsConnectionState == WSCONNECTING ? true : false}
                    />
                </View>
            </View>
        )
    }
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
    }
};
// const mapDispatchToProps = dispatch => ({})
const connectComponent = connect(mapStateToProps);
export default connectComponent(ControlsView);
