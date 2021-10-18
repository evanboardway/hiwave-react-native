import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken('pk.eyJ1IjoidGVzc29yby0iLCJhIjoiY2t1b3EzY2d2MGV1ejJ2bzFtbXIxMmdjbCJ9.P-4uyej3lnQVxNs1Tzc-Sw');

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  }
});

export default class Map extends Component {
  render() {
    return (
        <View style={styles.map}>
          <MapboxGL.MapView
            styleURL={"mapbox://styles/tessoro-/ckux4pjtw19fy18n0w3k7xz78"}
            showUserLocation={true}
            style={{flex: 1}}>
              <MapboxGL.Camera
                zoomLevel={12}
                centerCoordinate={[-85.63322067588241, 42.94984942526444]}
              >
              </MapboxGL.Camera>
              <MapboxGL.UserLocation/>
          </MapboxGL.MapView>
        </View>
      );
  }
}


// const MapView = (props) => {
    
//     return (
//         <View>
//             <Text>Map</Text>
//         </View>
//     );
// }

// const mapStateToProps = (state) => {
//     return { location: state.location }
// };
// const connectComponent = connect(mapStateToProps);
// export default connectComponent(MapView);