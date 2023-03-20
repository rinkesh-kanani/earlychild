import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set subject Loader
 */
export const setSubjectLoader = createAction(Actions.SET_SUBJECT_LOADER);
/**
 * @desc set subject list
 */
export const setSubjectList = createAction(Actions.SET_SUBJECT_LIST);

/**
 * @desc update subject
 */
export const updateSubject = createAction(Actions.UPDATE_SUBJECT);

/**
 * @desc clear subject data
 */
export const clearSubjectData = () => (dispatch) => {
  dispatch(setSubjectLoader(false));
  dispatch(setSubjectList(null));
};
