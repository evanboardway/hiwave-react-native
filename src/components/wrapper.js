import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ORIENTATION_CHANGE, WSCONNECTING, WSFAILED } from '../helpers/enums'
import MapView from './map';
import ControlsView from './controls'
import StreamRenderer from './streamRenderer'
import { CONTROLS_THEME, DARK_THEME, MAPBOX_THEME } from '../assets/themes';
import { Dimensions } from 'react-native';
import MapViewAlt from './mapalt'


const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};

const HomeWrapper = (props) => {
    Dimensions.addEventListener('change', () => {
        props.dispatch({
            type: ORIENTATION_CHANGE,
            payload: isPortrait() ? 'portrait' : 'landscape'
        })
    });
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
                <View style={props.orientation === "portrait" ? styles.wrapperPortrait : styles.wrapperLandscape}>
                    <View style={props.orientation === "portrait" ? styles.connectedUserCountPortrait : styles.connectedUserCountLandscape}>
                        <Text style={styles.connectedUserCount}>{props.userCount}</Text>
                    </View>
                    <View style={styles.map}>
                        <MapViewAlt></MapViewAlt>
                    </View>
                    <View style={styles.streamRenderer}>
                        <StreamRenderer></StreamRenderer>
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
    wrapperPortrait: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: DARK_THEME,
        alignItems: 'center',
    },
    wrapperLandscape: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: DARK_THEME,
        alignItems: 'center',
    },
    controls: {
        backgroundColor: MAPBOX_THEME,
        width: '70%',
    },
    map: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    streamRenderer: {
        height: 0
    },
    connectedUserCountPortrait: {
        position: 'absolute',
        zIndex: 999,
        backgroundColor: CONTROLS_THEME,
        alignItems: 'center',
        justifyContent: 'center',
        top: 60,
        left: 10,
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'rgba(235, 64, 52, 0.9)'
    },
    connectedUserCountLandscape: {
        position: 'absolute',
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
        left: 10,
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'rgba(235, 64, 52, 0.9)'
    },
    connectedUserCount: {
        color: 'rgba(255,255,255, 0.7)',
        fontSize: 16
    }
});




const mapStateToProps = (state) => {
    return {
        wsConnectionState: state.wsConnectionState,
        orientation: state.orientation,
        userCount: state.incomingStreams ? state.incomingStreams.length : 0
    }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(HomeWrapper);
