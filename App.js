import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Provider } from 'react-redux';
import Stack from './src';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <Stack/>
    </Provider>
  );
}

export default App;
