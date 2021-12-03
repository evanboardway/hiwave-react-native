import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';

const IMAGE_PIGGY = require("../assets/images/piggy.png")

MapboxGL.setAccessToken('pk.eyJ1IjoidGVzc29yby0iLCJhIjoiY2t1b3EzY2d2MGV1ejJ2bzFtbXIxMmdjbCJ9.P-4uyej3lnQVxNs1Tzc-Sw');

const Map = (props) => {

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
        {/* <MapboxGL.UserLocation /> */}

        <MapboxGL.MarkerView
          id={"myid"}
          coordinate={[-122.0312186, 37.33233141]}>
          <Image
            source={IMAGE_PIGGY}
            style={styles.icon}
          />
        </MapboxGL.MarkerView>


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
    height: 20,
    width: 20,
    opacity: 1,
    resizeMode: 'contain',
    backgroundColor: 'rgba(3, 240, 252, 0.8)',
    borderRadius: 10,
    borderWidth: 20,
    borderColor: 'rgba(3, 240, 252, 0.7)'

  },
});

const mapStateToProps = (state) => {
  console.log(state.currentLocation)
  return { location: [state.currentLocation.latitude, state.currentLocation.longitude] }
  // return { location: [37.33233141, -122.0312186] }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(Map);