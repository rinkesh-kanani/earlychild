import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set Completed Activity Loader
 */
export const setCompletedActivityLoader = createAction(Actions.SET_COMPLETED_ACTIVITY_LOADER);

/**
 * @desc set Completed Activity  List
 */
export const setCompletedActivityList = createAction(Actions.SET_COMPLETED_ACTIVITY_LIST);

/**
 * @desc Set Total Completed Activity count
 */
export const setTotalCompletedActivity = createAction(Actions.SET_TOTAL_COMPLETED_ACTIVITY);

/**
 * @desc set total Completed Activity  of this month
 */
export const setTotalCompletedActivityOfThisMonth = createAction(Actions.SET_TOTAL_COMPLETED_ACTIVITY_THIS_MONTH);
/**
 * @desc set Sorted Completed Activity  List
 */
export const setSortedCompletedActivityList = createAction(Actions.SET_SORTED_COMPLETED_ACTIVITY_LIST);

/**
 * @desc add new Completed Activity  in  the List
 */
export const addCompletedActivity = createAction(Actions.ADD_COMPLETED_ACTIVITY);

/**
 * @desc  update Completed Activity  in  the List
 */
export const updateCompletedActivity = createAction(Actions.UPDATE_COMPLETED_ACTIVITY);

/**
 * @desc set Completed Activity  List
 */
export const setCompletedActivityImageList = createAction(Actions.SET_COMPLETED_ACTIVITY_IMAGE_LIST);

/**
 * @desc add new Completed Activity  in  the List
 */
export const addCompletedActivityImage = createAction(Actions.ADD_COMPLETED_ACTIVITY_IMAGE);

/**
 * @desc  delete Completed Activity image  in  the List
 */
export const deleteCompletedActivityImage = createAction(Actions.DELETE_COMPLETED_ACTIVITY_IMAGE);

/**
 * @desc Clear Completed Activity Data
 */
export const clearCompletedActivityData = () => (dispatch) => {
  dispatch(setCompletedActivityLoader(false));
  dispatch(setCompletedActivityList(null));
  dispatch(setSortedCompletedActivityList(null));
  dispatch(setCompletedActivityImageList());
  dispatch(setTotalCompletedActivityOfThisMonth(0));
  dispatch(setTotalCompletedActivity(0));
};
