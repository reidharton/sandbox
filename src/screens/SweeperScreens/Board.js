import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

// import Tile from '../Tile/Tile';
import styles from '../../styles/SweeperStyles/boardStyles';

import { seedBoard } from '../../store/actions/sweeperActions'

const Board = ({ board }) => {
  return (
   <View>
     <Text>{JSON.stringify(board)}</Text>
   </View>
  )
}

const mapStateToProps = (state) => {
  const { board } = state.sweeperReducer;
  return { board };
}

export default connect(mapStateToProps)(memo(Board));