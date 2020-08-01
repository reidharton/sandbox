import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/SweeperStyles'

import { seedBoard } from '../../store/actions/sweeperActions';

import SweeperBoard from './SweeperBoard';

const MineSweeper = ({ navigation, gameStatus, seedBoard }) => {
  useEffect(() => {
    if(gameStatus === 'PENDING'){
      seedBoard(10)
    }
  })

  return (
    <View style={styles.container}>
      <SweeperBoard/>
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