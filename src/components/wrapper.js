import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { WSCONNECTING, WSFAILED, WSCONNECTED } from '../helpers/enums'
import MapView from './map';
import ControlsView from './controls'
import { DARK_THEME, OVERLAY_2 } from '../assets/themes';


const HomeWrapper = (props) => {
    switch (props.wsConnectionState) {
        case WSCONNECTING:
            return (<View style={styles.container}>
                <Text>Connecting...</Text>
            </View>)
        case WSFAILED:
            return (<View style={styles.container}>
                <Text>Failed to connect to server</Text>
            </View>)
        default:
            return (
                <View style={styles.wrapper}>
                    <View style={styles.map}>
                        <MapView></MapView>
                    </View>
                    <View style={styles.controls}>
                        <ControlsView ws={props.ws}></ControlsView>
                    </View>

                </View>
            )

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: DARK_THEME,
        alignItems: 'center',
    },
    controls: {
        flex: 1,
        backgroundColor: OVERLAY_2,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    map: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});




const mapStateToProps = (state) => {
    return { wsConnectionState: state.wsConnectionState }
};
const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps);
export default connectComponent(HomeWrapper);
