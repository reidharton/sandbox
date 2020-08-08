import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';

import SweeperTile from './SweeperTile';


const SweeperBoard = ({ board, toggle, style }) => {

  const startPlay = () => {
    toggle();
  }

  return (
   <View style={[styles.container, style && style]}>
     {board.flat().map((tile, index) => (
       <SweeperTile 
          key={index}
          tile={tile}
          startPlay={startPlay}
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

const styles = StyleSheet.create({
  container: {
    // height: '60%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    // marginVertical: 30
  },
})