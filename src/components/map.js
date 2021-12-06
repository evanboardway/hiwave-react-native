import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import PeerLocationsView from './peerLocations'

MapboxGL.setAccessToken('pk.eyJ1IjoidGVzc29yby0iLCJhIjoiY2t1b3EzY2d2MGV1ejJ2bzFtbXIxMmdjbCJ9.P-4uyej3lnQVxNs1Tzc-Sw');


export default MapView = () => {
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


        <PeerLocationsView />

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
});
