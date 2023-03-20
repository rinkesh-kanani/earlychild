import AsyncStorage from '@react-native-community/async-storage';
const AUTH_USER_KEY = 'ebm_user';
const CURRENT_USER = 'current_user';

export const saveAuthUser = async (data) => {
  try {
    var jsonOfItem = await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(data));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAuthUser = async () => {
  try {
    const user = await AsyncStorage.getItem(AUTH_USER_KEY);
    if (user) return JSON.parse(user);
    else return undefined;
  } catch (error) {
    console.log(error.message);
  }
};

export const setUser = async (data) => {
  try {
    var jsonOfItem = await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(data));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(CURRENT_USER);
    if (user) return JSON.parse(user);
    else return undefined;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAuthUser = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAllLocalData = async () => {
  await AsyncStorage.removeItem(AUTH_USER_KEY);
  await AsyncStorage.removeItem(CURRENT_USER);
};

const setLocalData = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

const getLocalData = async (key) => {
  const value = await AsyncStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
  return;
};

export default {
  setLocalData,
  getLocalData,
  deleteAllLocalData,
};
