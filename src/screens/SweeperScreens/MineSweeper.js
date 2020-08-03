import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/SweeperStyles'

import { seedBoard } from '../../store/actions/sweeperActions';

import SweeperBoard from './SweeperBoard';

const MineSweeper = ({ navigation, seedBoard, gameWon, gameLost }) => {
  useEffect(() => {
    seedBoard(10)
  })

  return (
    <View style={styles.container}>
      <View >
        <Text>{gameWon ? 'WON' : gameLost ? 'LOST' : 'PLAY'}</Text>
      </View>
      <SweeperBoard/>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { gameWon, gameLost } = state.sweeperReducer;
  return { gameWon, gameLost }
}

const mapDispatchToProps = {
  seedBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(MineSweeper))