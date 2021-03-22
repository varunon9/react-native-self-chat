import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USER: 'USER'
};

export const storeDataToStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    // saving error
    throw error;
  }
};

export const getDataFromStorage = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    // error reading value
    throw error;
  }
};
