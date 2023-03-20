import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc set subject list
 */
export const setAgeList = createAction(Actions.SET_AGE_LIST);

/**
 * @desc update subject
 */
export const updateAge = createAction(Actions.UPDATE_AGE);

/**
 * @desc set subject list
 */
export const setTypeOfActivityList = createAction(Actions.SET_TYPE_OF_ACTIVITY_LIST);

/**
 * @desc update subject
 */
export const updateTypeOfActivity = createAction(Actions.UPDATE_TYPE_OF_ACTIVITY);

/**
 * @desc clear subject data
 */
export const clearAgeData = () => (dispatch) => {
  dispatch(setAgeList(null));
  dispatch(setTypeOfActivityList(null));
};
