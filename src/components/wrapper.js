import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { WSCONNECTING, WSFAILED, WSCONNECTED } from '../helpers/enums'
import MapView from './map';
import ControlsView from './controls'


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
                <View style={styles.container}>
                    <MapView></MapView>
                    <ControlsView></ControlsView>
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
  });




const mapStateToProps = (state) => {
    return { wsConnectionState: state.wsConnectionState }
};
const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps);
export default connectComponent(HomeWrapper);
