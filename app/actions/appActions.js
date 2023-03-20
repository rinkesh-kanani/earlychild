import { createAction } from '@reduxjs/toolkit';
import { APP__SET_LOADING, SET_PROFILE_ROOT } from './types';

export const setLoading = createAction(APP__SET_LOADING);
export const setProfileRoot = createAction(SET_PROFILE_ROOT);

export const clearAppData = () => (dispatch) => {
  dispatch(setProfileRoot(false));
};
