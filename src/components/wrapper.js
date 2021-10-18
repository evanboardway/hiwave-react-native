import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { WSCONNECTING, WSFAILED, WSCONNECTED, WSCONNECT } from '../helpers/enums'
import MapView from './map';
import ControlsView from './controls'
import { DARK_THEME, OVERLAY_2,MAPBOX_THEME } from '../assets/themes';


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
                        <ControlsView></ControlsView>
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
        backgroundColor: MAPBOX_THEME,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    map: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});




const mapStateToProps = (state) => {
    return { wsConnectionState: state.wsConnectionState }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(HomeWrapper);
