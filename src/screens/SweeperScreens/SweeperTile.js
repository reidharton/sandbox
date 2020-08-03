import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { uncover, rightClick } from "../../store/actions/sweeperActions";
import styles from '../../styles/SweeperStyles/boardStyles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const SweeperTile = ({ board, tile, uncover, rightClick }) => {
  const [tapCount, setTapCount] = useState(0);

  const icon = tile.flag ? 'flag' : tile.bomb ? 'bomb' : ''
  const color = tile.hit ? 'red' : tile.flag ? 'green' : 'black'

  const handleTap = () => {
    uncover(tile);
    // if(tapCount === 0){
    //   setTapCount(tapCount + 1);
    //   setTimeout(() => {
    //     console.log('tapcount in setTimeout', tapCount)
    //     if(tapCount === 1){

    //       uncover(tile);
    //     }
    //     setTapCount(0)
    //   }, 100)
    // }else if(tapCount === 1){
    //   console.log('second one')
    //   rightClick(tile);
    //   setTapCount(0);
    // }
  }

  // useEffect(() => {
  //   if(tile.row === 9 && tile.col === 9){
  //     console.log('use effect', tile)
  //   }
  // }, [tapCount])

  return (
    <View
      style={[styles.tile, {
        width: WIDTH / board.length, 
        height: WIDTH / board.length,
      }, !tile.covered && {backgroundColor: 'darkgrey'}]}
    >
      {(!tile.covered && !tile.bomb) ?
      <Text>{tile.val !== 0 ? tile.val : ''}</Text> :
      <IconButton
        icon={icon}
        color={color}
        onPress={handleTap}
        style={styles.button}
      /> 
      }
    </View>
  )
}

const MapStateToProps = (state) => {
  const { board } = state.sweeperReducer;
  return { board }
}

const MapDispatchToProps = {
  uncover, 
  rightClick
}

export default connect(MapStateToProps, MapDispatchToProps)(memo(SweeperTile))
