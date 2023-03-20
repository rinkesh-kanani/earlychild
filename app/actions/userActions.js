import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set User Loader
 */
export const setUserLoader = createAction(Actions.SET_USER_LOADER);

/**
 * @desc Set User Data
 */
export const setUserData = createAction(Actions.SET_USER_DATA);
/**
 * @desc update User Data
 */
export const updateUserData = createAction(Actions.UPDATE_USER_DATA);

/**
 * @desc Clear User Data
 */
export const clearUserData = () => (dispatch) => {
  dispatch(setUserLoader(false));
  dispatch(setUserData(null));
};
