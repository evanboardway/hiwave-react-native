import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import WebSocketProvider, { WebSocketContext } from './src/services/connection'

export default function App() {
  return (
    <Provider store={store}>
      <WebSocketProvider>
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