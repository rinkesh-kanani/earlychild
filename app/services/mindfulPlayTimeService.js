import {
  setMindfulPlaytimeList,
  setMindfulPlaytimeLoader,
  setStreakOfAllTime,
  setStreakOfThisMonth,
  setTotalMindfulPlaytime,
  setTotalMindfulPlaytimeOfThisMonth,
} from '../actions/minfulPlaytimeActions';
import MindfulPlaytimeService from '../dbservices/MindfulPlaytimeDbService';
import { currentStreak } from '../helpers/helpers';
import { getCurrentUserId } from './userService';

/**
 * @desc Miuindful Play time  - Get all Documents
 * @param {*}
 */
export const getMindfulPlaytimeAllDocument = () => async (dispatch) => {
  try {
    dispatch(setMindfulPlaytimeLoader(true));
    const userId = getCurrentUserId();
    const response = await MindfulPlaytimeService.getInstance()?.getMindfulPlaytimeDocuments(userId);
    if (response) {
      dispatch(setMindfulPlaytimeList(response));
      const currentMonth = new Date().getUTCMonth();

      const totalMindfulPlaytimeOfthisMonth = response?.filter((item) => {
        if (new Date(item?.playTimeDate).getUTCMonth() === currentMonth) return true;
        return false;
      })?.length;

      const dateList = response?.map((item) => new Date(item?.playTimeDate)).sort((a, b) => b - a);
      const streak = currentStreak(dateList);

      dispatch(setTotalMindfulPlaytimeOfThisMonth(totalMindfulPlaytimeOfthisMonth));
      dispatch(setTotalMindfulPlaytime(response?.length));
      dispatch(setStreakOfThisMonth(streak?.thisMonth));
      dispatch(setStreakOfAllTime(streak?.allTime));
      dispatch(setMindfulPlaytimeLoader(false));
      return response;
    }
  } catch (e) {
    console.log('getMindfulPlaytimeAllDocument', e);
    return false;
  } finally {
    dispatch(setMindfulPlaytimeLoader(false));
  }
};

/**
 * @desc Miuindful Play time - Create  New Document
 * @param {*}
 */
export const createMindfulPlaytimeNewDocument = (payload) => async (dispatch) => {
  try {
    dispatch(setMindfulPlaytimeLoader(true));
    const userId = getCurrentUserId();
    const response = await MindfulPlaytimeService.getInstance()?.create(userId, payload);
    if (response) {
      dispatch(setMindfulPlaytimeLoader(false));
      return response;
    }
  } catch (e) {
    console.log('createMindfulPlaytimeNewDocument', e);
    return false;
  } finally {
    dispatch(setMindfulPlaytimeLoader(false));
  }
};
