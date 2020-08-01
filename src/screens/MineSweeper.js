import React, { memo } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/sweeperStyles'


const MineSweeper = ({ navigation }) => {

  return (
    <View style={styles.container}>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(memo(MineSweeper))