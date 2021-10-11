import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import MapView from './src/components/map'
import ControlsView from './src/components/controls';
import WebSocketProvider, { WebSocketContext } from './src/services/websocket'

export default function App() {

  return (
    <Provider store={store}>
      <WebSocketProvider>
        <View style={styles.container}>
          <MapView name="map"></MapView>
          <ControlsView></ControlsView>
        </View>
      </WebSocketProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// npx react-native run-ios --simulator