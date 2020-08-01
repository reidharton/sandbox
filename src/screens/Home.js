import React, { memo } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/homeStyles'
import { updateCount } from '../store/reducers/home';

const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Chess')}>
        <Text style={styles.text}>Chess</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home));