import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Text, View, Dimensions, TouchableOpacity, TouchableHighlightComponent } from 'react-native';
import { uncover, rightClick } from "../../store/actions/sweeperActions";

import styles from '../../styles/SweeperStyles/boardStyles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const FLAG = '\u2691';
const BOMB = '💣';

const SweeperTile = ({ board, tile, uncover, rightClick }) => {
  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => {
    console.log('on the top', tapCount)
    if(tapCount === 0){
      setTimeout(() => {
        console.log('tapcount', tapCount)
        if(tapCount === 1){

          uncover(tile);
        }
        setTapCount(0)
      }, 200)
      setTapCount(tapCount + 1);
    }else if(tapCount === 1){
      console.log('second one')
      rightClick(tile);
      setTapCount(0);
    }
   
   
  }

  useEffect(() => {
    console.log('use effect', tile)
    if(tile.row === 9 && tile.col === 9){
    }
  }, [tapCount])

  return (
    <TouchableOpacity 
      style={[styles.tile, {
        width: WIDTH / board.length, 
        height: WIDTH / board.length,
      }, !tile.covered && {backgroundColor: 'grey'}]}
      onPress={handleTap}
    >
      {(() => {
          return <Text style={{color: 'white'}}>{
            tile.flag ? FLAG : tile.hit ? BOMB : ''
          }</Text>
      })()}
    </TouchableOpacity>
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
