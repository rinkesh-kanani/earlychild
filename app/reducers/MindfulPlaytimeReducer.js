import { combineReducers } from 'redux';
import * as Actions from '../actions/types';
import { createReducer } from '../helpers/reduxHelpers';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_MINDFUL_PLAYTIME_LOADER,
});

const mindfulPlaytimeListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_MINDFUL_PLAYTIME_LIST,
});

const totalMindfulPlaytimeOfThisMonthReducer = createReducer({
  initialState: 0,
  actionType: Actions.SET_TOTAL_MINDFUL_PLAYTIME_THIS_MONTH,
});

const totalMindfulPlaytimeReducer = createReducer({
  initialState: 0,
  actionType: Actions.SET_TOTAL_MINDFUL_PLAYTIME,
});

const streakOfThisMonthReducer = createReducer({
  initialState: 0,
  actionType: Actions.SET_STREAK_OF_THIS_MONTH,
});

const streakOfAllTimeReducer = createReducer({
  initialState: 0,
  actionType: Actions.SET_STREAK_OF_ALL_TIME,
});

export default combineReducers({
  loading: loadingReducer,
  mindfulPlaytimeList: mindfulPlaytimeListReducer,
  TotalMindfulPlaytimeOfThisMonth: totalMindfulPlaytimeOfThisMonthReducer,
  TotalMindfulPlaytime: totalMindfulPlaytimeReducer,
  streakOfThisMonth: streakOfThisMonthReducer,
  streakOfAllTime: streakOfAllTimeReducer,
});
