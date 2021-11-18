import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ORIENTATION_CHANGE, WSCONNECTING, WSFAILED } from '../helpers/enums'
import MapView from './map';
import ControlsView from './controls'
import StreamRenderer from './streamRenderer'
import { DARK_THEME, MAPBOX_THEME } from '../assets/themes';
import { Dimensions } from 'react-native';


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
                    <View style={styles.map}>
                        <MapView></MapView>
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
    },
    streamRenderer: {
        height: 0
    }
});




const mapStateToProps = (state) => {
    return { 
        wsConnectionState: state.wsConnectionState,
        orientation: state.orientation
    }
};
const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps);
export default connectComponent(HomeWrapper);
