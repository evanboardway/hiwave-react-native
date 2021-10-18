import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store/store';
import HomeWrapper from './src/components/wrapper'
import { START_LOCATION_SERVICE, WSCONNECT } from './src/helpers/enums';

export default function App() {
  store.dispatch({
    type: WSCONNECT
  })
  store.dispatch({
    type: START_LOCATION_SERVICE
  })
  return (
    <Provider store={store}>
      <HomeWrapper></HomeWrapper>
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