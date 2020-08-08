import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { uncover, rightClick } from "../../store/actions/sweeperActions";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const colors = {
  1: 'blue',
  2: 'green',
  3: 'red',
  4: 'purple',
  5: 'maroon',
  6: 'turquoise',
  7: 'black',
  8: 'grey',
}

const SweeperTile = ({ play, flagMode, board, tile, uncover, rightClick, startPlay }) => {

  const handleTilePress = (tile) => {
    if(!play){
      startPlay();
    }
    if(flagMode){
      rightClick(tile);
    }else {
      uncover(tile)
    }
  }

  return (
    <View
      style={[styles.tile, {
        width: WIDTH / board.length, 
        height: WIDTH / board.length,
      }, !tile.covered && {backgroundColor: 'darkgrey'}]}
    >
      {tile.covered ?
        <IconButton
          size={20}
          icon='flag'
          color={tile.flag ? 'darkred' : 'black'}
          onPress={() => handleTilePress(tile)}
        /> 
      : tile.bomb ? 
        <IconButton
          size={20}
          icon='bomb'
          color={tile.hit ? 'red' : 'black'}
        />
      : tile.val ?
        <Text style={{color: colors[tile.val]}}>{tile.val}</Text>
      : null
      }
    
    </View>
  )
}

const MapStateToProps = (state) => {
  const { play, flagMode, board } = state.sweeperReducer; // sweeper
  return { play, flagMode, board }
}

const MapDispatchToProps = {
  uncover, 
  rightClick
}

export default connect(MapStateToProps, MapDispatchToProps)(memo(SweeperTile))

const styles = StyleSheet.create({
  tile: {
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
})