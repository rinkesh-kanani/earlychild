import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set Theme Loader
 */
export const setThemeLoader = createAction(Actions.SET_THEME_LOADER);
/**
 * @desc set theme list
 */
export const setThemeList = createAction(Actions.SET_THEME_LIST);

/**
 * @desc set featured theme list
 */
export const setFeaturedThemeList = createAction(Actions.SET_FEATURED_THEME_LIST);

/**
 * @desc clear theme data
 */
export const clearThemeData = () => (dispatch) => {
  dispatch(setThemeLoader(false));
  dispatch(setThemeList(null));
  dispatch(setFeaturedThemeList(null));
};
