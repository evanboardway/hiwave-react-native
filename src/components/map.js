import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';
import { REFRESH_LOCATION, UPDATE_LOCATION } from '../helpers/enums';


MapboxGL.setAccessToken('pk.eyJ1IjoidGVzc29yby0iLCJhIjoiY2t1b3EzY2d2MGV1ejJ2bzFtbXIxMmdjbCJ9.P-4uyej3lnQVxNs1Tzc-Sw');

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  }
});

const Map = (props) => {
  return (
    <View style={styles.map}>
      <MapboxGL.MapView
        styleURL={"mapbox://styles/tessoro-/ckux4pjtw19fy18n0w3k7xz78"}
        showUserLocation={true}
        style={{ flex: 1 }}>
        <MapboxGL.Camera
          zoomLevel={16}
          followUserLocation={true}
          centerCoordinate={[props.location.coords.longitude, props.location.coords.latitude]}
        >
        </MapboxGL.Camera>
        <MapboxGL.UserLocation />
      </MapboxGL.MapView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return { location: state.currentLocation }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(Map);