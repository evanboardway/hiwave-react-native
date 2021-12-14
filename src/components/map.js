import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';
import { AvatarToImage } from '../helpers/avatars';


MapboxGL.setAccessToken('pk.eyJ1IjoidGVzc29yby0iLCJhIjoiY2t1b3EzY2d2MGV1ejJ2bzFtbXIxMmdjbCJ9.P-4uyej3lnQVxNs1Tzc-Sw');


const MapView = (props) => {
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

        {props.locations.map(peerLocation => {
          return (<MapboxGL.MarkerView
            id={peerLocation.id}
            key={peerLocation.id}
            coordinate={[peerLocation.location.Longitude, peerLocation.location.Latitude]}>
            <View style={styles.iconWrapper}>
              <Image
                source={AvatarToImage(peerLocation.avatar)}
                style={styles.icon}
              />
            </View>
          </MapboxGL.MarkerView>)
        })}

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
  return { locations: state.peerLocations }
};
const connectComponent = connect(mapStateToProps);
export default connectComponent(MapView);
