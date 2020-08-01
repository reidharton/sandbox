import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Text, View, Dimensions } from 'react-native';



import SweeperTile from './SweeperTile';
import styles from '../../styles/SweeperStyles/boardStyles';


const SweeperBoard = ({ board }) => {
  return (
   <View style={styles.container}>
     {board.flat().map((tile, index) => (
       <SweeperTile 
        key={index}
       />
     ))}
   </View>
  )
}

const mapStateToProps = (state) => {
  const { board } = state.sweeperReducer;
  return { board };
}

export default connect(mapStateToProps)(memo(SweeperBoard));