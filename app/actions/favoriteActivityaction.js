import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set favorite Activity Loader
 */
export const setFavoriteActivityLoader = createAction(Actions.SET_FAVORITE_ACTIVITY_LOADER);

/**
 * @desc set favorite Activity  List
 */
export const setFavoriteActivityList = createAction(Actions.SET_FAVORITE_ACTIVITY_LIST);

/**
 * @desc set favorite Activity
 */
export const setFavoriteActivity = createAction(Actions.SET_FAVORITE_ACTIVITY);

/**
 * @desc update favorite Activity
 */
export const updateFavoriteActivity = createAction(Actions.UPDATE_FAVORITE_ACTIVITY);
/**
 * @desc clear favorite Activity data
 */
export const clearFavoriteActivity = createAction(Actions.CLEAR_FAVORITE_ACTIVITY);

export const clearCompletedActivityData = () => (dispatch) => {
  dispatch(setFavoriteActivityLoader(false));
  dispatch(setFavoriteActivityList(null));
  dispatch(clearFavoriteActivity());
};
