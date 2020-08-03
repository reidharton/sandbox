import React, { memo, useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/SweeperStyles'

import { seedBoard } from '../../store/actions/sweeperActions';

import SweeperBoard from './SweeperBoard';

const MineSweeper = (props) => {
  const [play, setPlayStatus] = useState(false);
  const [minsElapsed, setMinsElapsed] = useState(0);
  const [secsElapsed, setSecsElapsed] = useState(0);

  const { seedBoard, gameWon, gameLost, mines } = props; //home
  const { navigation } = props;

  // Generate 10x10 board. Will bake in NxN(M?) options later
  // useEffect(() => { 
  //   console.log('seeding board')
  //   seedBoard(10);
  // }, [])

  const toggle = () => {
    setPlayStatus(!play);
  }

  const reset = () => {
    setSeconds(0);
    setPlayStatus(false);
  }

  useEffect(() => {
    // console.log(`effect this ${''}`)
    let interval = null;
    if (play) {
      interval = setInterval(() => {
        if(secsElapsed === 59){
          setMinsElapsed(minsElapsed => minsElapsed + 1);
          setSecsElapsed(0);
        }else{
          setSecsElapsed(secsElapsed => secsElapsed + 1);
        }
      }, 1000);
    } else if (!play && secsElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [play, minsElapsed, secsElapsed]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {play ? 
          <TouchableOpacity style={styles.button} onPress={toggle}>
            <Text style={styles.text}>{minsElapsed < 10 ? `0${minsElapsed}` : minsElapsed}:{secsElapsed < 10 ? `0${secsElapsed}` : secsElapsed}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.button} onPress={toggle}>
            <Text style={styles.text}>{gameWon ? 'WON' : gameLost ? 'LOST' : !play ? 'PLAY' : 'TIMER'}</Text>
          </TouchableOpacity>
        }
      </View>
      <SweeperBoard play={play}/>
      <View style={styles.subContainer}>
        <View style={styles.counter}>
          <View style={styles.label}>
            <Text style={styles.text}>Mines</Text>
          </View>
          <View style={styles.count}>
            <Text style={[styles.text]}>{mines}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { gameWon, gameLost, mines } = state.sweeperReducer;
  return { gameWon, gameLost, mines }
}

const mapDispatchToProps = {
  seedBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(MineSweeper))