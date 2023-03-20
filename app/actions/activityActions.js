import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set activity Loader
 */
export const setActivityLoader = createAction(Actions.SET_ACTIVITY_LOADER);
/**
 * @desc set activity list
 */
export const setActivityList = createAction(Actions.SET_ACTIVITY_LIST);

/**
 * @desc set just added activity list
 */
export const setJustAddedActivityList = createAction(Actions.SET_JUST_ADDED_ACTIVITY_LIST);
/**
 * @desc set child wise activity list
 */
export const setChildActivityList = createAction(Actions.SET_CHILD_ACTIVITY_LIST);

/**
 * @desc set filter list
 */
export const setFilterActivityList = createAction(Actions.SET_FILTER_ACTIVITY_LIST);

/**
 * @desc set theme activity list
 */
export const setThemeActivityList = createAction(Actions.SET_THEME_ACTIVITY_LIST);
/*
 * @desc set activity detail
 */
export const setActivityItem = createAction(Actions.SET_ACTIVITY_ITEM);
/**
 * @desc set  Milestone Task Activity List
 */
export const setMilestoneTaskActivityList = createAction(Actions.SET_MILESTONE_TASK_ACTIVITY_LIST);

/**
 * @desc set  Today Activity List
 */
export const setTodayctivityList = createAction(Actions.SET_TODAY_ACTIVITY_LIST);
/**
 * @desc clear activity data
 */
export const clearActivityData = () => (dispatch) => {
  dispatch(setActivityLoader(false));
  dispatch(setActivityList(null));
  dispatch(setFilterActivityList(null));
  dispatch(setThemeActivityList(null));
  dispatch(setMilestoneTaskActivityList(null));
  dispatch(setChildActivityList(null));
  dispatch(setTodayctivityList(null));
  dispatch(setJustAddedActivityList(null));
};
