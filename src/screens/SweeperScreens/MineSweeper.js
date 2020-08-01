import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/SweeperStyles'

import { seedBoard } from '../../store/actions/sweeperActions';

import Board from './Board';

const MineSweeper = ({ navigation, gameStatus, seedBoard }) => {
  // console.log(props)
  useEffect(() => {
    if(gameStatus === 'PENDING'){
      seedBoard(10)
    }
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <Board />
    </View>
  )
}

const mapStateToProps = (state) => {
  const { gameStatus } = state.sweeperReducer;
  return { gameStatus }
}

const mapDispatchToProps = {
  seedBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(MineSweeper))