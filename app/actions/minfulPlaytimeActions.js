import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set Mindful Playtime Loader
 */
export const setMindfulPlaytimeLoader = createAction(Actions.SET_MINDFUL_PLAYTIME_LOADER);

/**
 * @desc Set Mindful Playtime list
 */
export const setMindfulPlaytimeList = createAction(Actions.SET_MINDFUL_PLAYTIME_LIST);
/**
 * @desc Set Total Mindful Playtime
 */
export const setTotalMindfulPlaytime = createAction(Actions.SET_TOTAL_MINDFUL_PLAYTIME);

/**
 * @desc set total Mindful Playtime  of this month
 */
export const setTotalMindfulPlaytimeOfThisMonth = createAction(Actions.SET_TOTAL_MINDFUL_PLAYTIME_THIS_MONTH);

/**
 * @desc Set Streak of this month Mindful Playtime
 */
export const setStreakOfThisMonth = createAction(Actions.SET_STREAK_OF_THIS_MONTH);

/**
 * @desc Set Streak of all time Mindful Playtime
 */
export const setStreakOfAllTime = createAction(Actions.SET_STREAK_OF_ALL_TIME);
/**
 * @desc clear Mindful Playtime  data
 */
export const clearMindfulPlaytimeData = () => (dispatch) => {
  dispatch(setMindfulPlaytimeLoader(false));
  dispatch(setMindfulPlaytimeList(null));
  dispatch(setTotalMindfulPlaytimeOfThisMonth(0));
  dispatch(setTotalMindfulPlaytime(0));
  dispatch(setStreakOfThisMonth(0));
  dispatch(setStreakOfAllTime(0));
};
