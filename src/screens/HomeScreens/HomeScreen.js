import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from '../../styles/homeStyles'

import { setHighScoreMi } from '../../store/actions/homeActions'

import { getStorageData, saveStorageData } from '../../utils/localStorage'

const Home = ({ navigation, setHighScoreMi }) => {

  const loadHighScores = async () => {
    try {
      let highScore = await getStorageData('high_mi');
      if(!highScore){
        await saveStorageData('high_mi', '00:00')
      }else{
        setHighScoreMi(highScore)
      }

    } catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    loadHighScores();
  }, [])

  return (
    <View style={styles.container}>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Chess')}>
        <Text style={styles.text}>Chess</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('MineSweeper')}>
        <Text style={styles.text}>MineSweeper</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  setHighScoreMi
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home));