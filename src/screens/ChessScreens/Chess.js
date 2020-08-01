import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import styles from '../../styles/chessStyles';

const Chess = ({ navigation }) => {

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

export default memo(Chess);