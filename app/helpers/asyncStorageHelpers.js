import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { isToday } from './helpers';
const IS_LOGGEDIN_KEY = 'earlybird_milestone_isLoggedInBefore';
const MINDFUL_PLAYTIME_DISMISS = 'mindful_playtime_dismiss';
const SELECT_CHILD_MODAL_OPEN_TODAY = 'select_child_modal_open_today';
const CURRENT_CHILD = 'current_child';

class AsyncStorageHelpers {
  setValue = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };
  getValue = async (key) => {
    const result = await AsyncStorage.getItem(key);
    if (result && !_.isNull(result)) {
      return JSON.parse(result);
    }
    return null;
  };

  saveIsLoggedInBefore = async (value) => {
    try {
      var jsonOfItem = await this.setValue(IS_LOGGEDIN_KEY, value);
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  };

  getIsLoggedInBefore = async () => {
    try {
      const value = await this.getValue(IS_LOGGEDIN_KEY);
      if (value) return JSON.parse(value);
      else return undefined;
    } catch (error) {
      console.log(error.message);
    }
  };
  setIsPlaytimeDismiss = async (value) => {
    var jsonOfItem = await this.setValue(MINDFUL_PLAYTIME_DISMISS, JSON.stringify(value));
    return jsonOfItem;
  };

  getIsPlaytimeDismiss = async () => {
    try {
      const value = await this.getValue(MINDFUL_PLAYTIME_DISMISS);
      if (value) return JSON.parse(value);
      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  setIsSelectChildModalOpenToday = async () => {
    const today = new Date();
    const jsonOfItem = await this.setValue(SELECT_CHILD_MODAL_OPEN_TODAY, today);
    return jsonOfItem;
  };

  getIsSelectChildModalOpenToday = async () => {
    const date = await this.getValue(SELECT_CHILD_MODAL_OPEN_TODAY);
    return isToday(date);
  };

  setCurrentChild = async (value) => {
    try {
      var jsonOfItem = await this.setValue(CURRENT_CHILD, value);
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  };

  getCurrentChild = async () => {
    try {
      const value = await this.getValue(CURRENT_CHILD);
      if (value) return value;
      else return undefined;
    } catch (error) {
      console.log(error.message);
    }
  };

  clearLocalKeys = async () => {
    try {
      await AsyncStorage.removeItem(MINDFUL_PLAYTIME_DISMISS);
      await AsyncStorage.removeItem(CURRENT_CHILD);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new AsyncStorageHelpers();
