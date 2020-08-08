import React, { memo, useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/sweeperStyles'
import { setHighScoreMi } from '../../store/actions/homeActions'
import { seedBoard, togglePlay, toggleFlagMode } from '../../store/actions/sweeperActions';

import SweeperBoard from './SweeperBoard';
import { IconButton } from 'react-native-paper';
import { saveStorageData } from '../../utils/localStorage';

const MineSweeper = (props) => {
  
  const [timer, toggleTimer] = useState(false);
  // const [flagMode, setFlagMode] = useState(false);
  const [time, setTime] = useState('00:00');
  const [minsElapsed, setMinsElapsed] = useState(0);
  const [secsElapsed, setSecsElapsed] = useState(0);
  const { high_mi } = props; // home
  const { setHighScoreMi } = props; // home
  const { play, flagMode, gameWon, gameLost, mines } = props; // sweeper
  const { seedBoard, togglePlay, toggleFlagMode } = props; // sweeper
  const { navigation } = props;

  useEffect(() => { 
    seedBoard();
  }, [])

  useEffect(() => {
    if(gameWon || gameLost){
      toggleTimer(false);
    }
    if(gameWon){
      console.log('winner')
      setHighScoreMi(time);
      saveNewHighScore(time);
    }else if(gameLost){
      console.log('loser')
      toggleTimer(false);
      togglePlay();
    }
  }, [gameWon, gameLost])

  const toggle = () => {
    if(!play){
      toggleTimer(!timer);
      togglePlay()
    }
  }
 
  const reset = () => {
    toggleTimer(false);
    setMinsElapsed(0);
    setSecsElapsed(0);
    setTime('00:00')
    togglePlay();
    seedBoard();
  }

  useEffect(() => {
    let interval = null;
    if (timer) {
      interval = setInterval(() => {
        let secs = secsElapsed;
        let mins = minsElapsed;
        if(secsElapsed === 59){
          mins++;
          secs = 0;
          setMinsElapsed(minsElapsed => minsElapsed + 1);
          setSecsElapsed(0);
        }else{
          secs++;
          setSecsElapsed(secsElapsed => secsElapsed + 1);
        }
        setTime(`${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`)
      }, 1000);
    } else if (!timer && secsElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, minsElapsed, secsElapsed]);

  const saveNewHighScore = async (high_mi) => {
    try {
      await saveStorageData('high_mi', high_mi);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, {flex: 1}]}>
        <IconButton
          size={25}
          icon='flag'
          color={flagMode ? 'darkred' : 'white'}
          style={[styles.button, {width: 50}]}
          onPress={play ? toggleFlagMode : () => {}}
        />

        <TouchableOpacity style={styles.button} onPress={toggle}>
          <Text style={styles.text}>{time}</Text>
        </TouchableOpacity>

        <IconButton
          size={25}
          icon='restart'
          color='white'
          onPress={reset}
          style={[styles.button, {width: 50}]}
        />
      </View>

      <SweeperBoard style={{flex: 3}} toggle={toggle}/>

      <View style={[styles.subContainer, {flex: 1}]}>

        <View style={[styles.counter, {flex: 2}]}>
          <View style={styles.label}>
            <Text style={styles.text}>Mines</Text>
          </View>
          <View style={styles.count}>
            <Text style={[styles.text]}>{mines}</Text>
          </View>
        </View>

        <View style={[styles.high, {flex: 3}]}>
          <View style={styles.label}>
            <Text style={styles.text}>{gameWon ? 'You Win!' : gameLost ? 'Game Over!' : 'High Score'}</Text>
          </View>
          <View style={styles.count}>
            <Text style={[styles.text]}>{(gameWon || gameLost) ? time : high_mi}</Text>
          </View>
        </View>

      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { high_mi } = state.homeReducer; // home
  const { 
    play, flagMode, 
    gameWon, gameLost, mines,  } = state.sweeperReducer; // sweeper 

  return { 
    high_mi, play, flagMode, 
    gameWon, gameLost, mines,
  }
}

const mapDispatchToProps = {
  seedBoard,
  togglePlay,
  toggleFlagMode,
  setHighScoreMi
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(MineSweeper))