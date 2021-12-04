import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';
import { CONTROLS_BUTTON, CONTROLS_THEME, RED_ACCENT } from '../assets/themes';

const IMAGE_PIGGY = require("../assets/images/piggy.png")

MapboxGL.setAccessToken('pk.eyJ1IjoidGVzc29yby0iLCJhIjoiY2t1b3EzY2d2MGV1ejJ2bzFtbXIxMmdjbCJ9.P-4uyej3lnQVxNs1Tzc-Sw');

function RenderPeerMarkers(peerLocations) {
  let markers = []
  console.log("rerender map", peerLocations)

  peerLocations.forEach((location, uuid) => {

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

const MapView = (props) => {
  let markers = null
  if (props.peerLocations) {
    markers = RenderPeerMarkers(props.peerLocations)
  }

  return (
    <View style={styles.map}>
      <MapboxGL.MapView
        styleURL={"mapbox://styles/tessoro-/ckux4pjtw19fy18n0w3k7xz78"}
        logoEnabled={false}
        compassEnabled={true}
        scrollEnabled={false}
        rotateEnabled={true}
        showUserLocation={true}
        style={{ flex: 1 }}>
        <MapboxGL.Camera
          zoomLevel={16}
          followUserLocation={true}
          followUserMode={'course'}
          followZoomLevel={16}
        >
        </MapboxGL.Camera>
        <MapboxGL.UserLocation />


        {markers}

      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
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
export default connectComponent(MapView);