import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';


const IMAGE_PIGGY = require("../assets/images/piggy.png")


const PeerLocationsView = (props) => {
    let markers = []
    console.log("rerender map", props.peerLocations)

    props.peerLocations.forEach((location, uuid) => {

        markers.push(
            <MapboxGL.MarkerView
                id={uuid}
                key={uuid}
                coordinate={[location.Longitude, location.Latitude]}>
                <View style={styles.iconWrapper}>
                    <Image
                        source={IMAGE_PIGGY}
                        style={styles.icon}
                    />
                </View>
            </MapboxGL.MarkerView>
        )

    })
    return (
        <View>
            {markers}
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        height: 15,
        width: 15,
        opacity: 1,
        resizeMode: 'contain',
        borderRadius: 10
    },
    iconWrapper: {
        backgroundColor: 'rgb(255, 179, 0)',
        padding: 5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.7)'
    }
});

const mapStateToProps = (state) => {
    // let temp = new Map()
    // temp.set("dc30d3f7-a67f-429a-9623-4da1af99c7de", { "Accuracy": 65, "Altitude": 0, "AltitudeAccuracy": -1, "Heading": -1, "Latitude": 37.33240905, "Longitude": -122.03051211, "Speed": -1 })
    return { peerLocations: state.peerLocations }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(PeerLocationsView);