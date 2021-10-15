import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

const MapView = (props) => {
    
    return (
        <View>
            <Text>Map</Text>
        </View>
    );
}

const mapStateToProps = (state) => {
    return { location: state.location }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(MapView);