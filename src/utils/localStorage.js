/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';

export const saveStorageData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    console.log('Save Fail: ', e);
  }
};

export const saveMultStorageData = async (keys) => {
  try {
    await AsyncStorage.multiSet(keys);
  } catch (e){
    console.log('Multiset Fail: ', e)
  }
}

export const getStorageData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {return value;}
  } catch (e) {
    console.log('Get Fail: ', e);
  }
};

export const getMultStorageData = async (keys) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    if(values != null) {return values}
  } catch (e){
    console.log('Multiget Fail: ', e)
  }
}

export const removeStorageData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Remove Fail: ', e);
  }
};

