import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set Auth Loader
 */
export const setAuthLoader = createAction(Actions.SET_AUTH_LOADER);
/**
 * @desc Update Login User
 */
export const updateLoginUser = createAction(Actions.UPDATE_LOGIN_USER);
/**
 * @desc clear Login User
 */
export const clearLoginUser = createAction(Actions.CLEAR_LOGIN_USER);

/**
 * @desc Update Signin User
 */
export const updateSigninUser = createAction(Actions.UPDATE_SIGNIN_USER);
/**
 * @desc clear Login User
 */
export const clearSigninUser = createAction(Actions.CLEAR_SIGNIN_USER);
/**
 * @desc update Sign up User
 */
export const updateSignupUser = createAction(Actions.UPDATE_SIGNUP_USER);
/**
 * @desc clear Sign up User
 */
export const clearSignupUser = createAction(Actions.CLEAR_SIGNUP_USER);

/**
 * @desc update Sign up User
 */
export const updateOnBoardingUser = createAction(Actions.UPDATE_ONBOARDING_USER);
/**
 * @desc clear Sign up User
 */
export const clearOnBoardingUser = createAction(Actions.CLEAR_ONBOARDING_USER);

/**
 * @desc set Child Item
 */
export const setChildItem = createAction(Actions.SET_CHILD_ITEM);

/**
 * @desc update Child Item
 */
export const updateChildItem = createAction(Actions.UPDATE_CHILD_ITEM);

/**
 * @desc clear Child Item
 */
export const clearChildItem = createAction(Actions.CLEAR_CHILD_ITEM);

/**
 * @desc Clear Auth Data
 */
export const clearAuthData = () => (dispatch) => {
  dispatch(setAuthLoader(false));
  dispatch(clearLoginUser());
  dispatch(clearSigninUser());
  dispatch(clearSignupUser());
  dispatch(clearOnBoardingUser());
  dispatch(clearChildItem());
};
