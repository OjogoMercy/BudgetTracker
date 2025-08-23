import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/HomeScreen'
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}

export default App

const styles = StyleSheet.create({})