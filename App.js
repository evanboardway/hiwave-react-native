import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const rootReducer = (state = {}, action) => { return state }
const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>You wanna seee some real speed</Text>
        <StatusBar style="auto" />
      </View>
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


// To connect component to redux.
// import { connect } from 'react-redux'

// And then calling it with a mapStateToProps or mapDispatchToProps argument, and then passing in the unconnected component:

// const ConnectedLoginGate = connect(state => ({ username: state.auth.username }))(LoginGate)


// npx react-native run-ios --simulator