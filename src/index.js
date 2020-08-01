import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, CommonActions } from '@react-navigation/native';


import Home from './screens/Home';
import Chess from './screens/Chess';

const Stack = createStackNavigator();

const Stacks = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          },
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen 
          name="Chess" 
          component={Chess}
        />
      </Stack.Navigator>
    </NavigationContainer>
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

export default Stacks;
