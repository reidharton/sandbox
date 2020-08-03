import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { uncover, rightClick } from "../../store/actions/sweeperActions";
import styles from '../../styles/SweeperStyles/boardStyles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const SweeperTile = ({ play, board, tile, uncover, rightClick }) => {
  const [tapCount, setTapCount] = useState(0);
  const [timer, setTimer] = useState(false);
  const icon = tile.flag ? 'flag' : tile.bomb ? 'bomb' : ''
  const color = tile.hit ? 'red' : tile.flag ? 'green' : 'black'

  const handleTap = () => {
    setTapCount(tapCount + 1)
  }

  useEffect(() => {
    // console.log(tapCount);
    console.log('--------------------');
    let interval = null;
    if(tapCount === 0) {
      interval = setInterval(() => {
        if(tapCount > 1){
          console.log('double click')
        }else{
          console.log('single click')
        }
        setTapCount(0)
        setTimer(false)
      }, 200)
      setTimer(true);
      setTapCount(tapCount + 1)
    } else if(!timer){
      setTapCount(0);
    } else {
      setTapCount(tapCount + 1)
    }
  }, [tapCount, timer])


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
        onPress={play && handleTap}
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
