import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set child Loader
 */
export const setChildLoader = createAction(Actions.SET_CHILD_LOADER);

/**
 * @desc set Child  List
 */
export const setChildList = createAction(Actions.SET_CHILD_LIST);

/**
 * @desc add new Child  in  the List
 */
export const addChild = createAction(Actions.ADD_CHILD);

/**
 * @desc  update Child  in  the List
 */
export const updateChild = createAction(Actions.UPDATE_CHILD);

/**
 * @desc delete Child  in  the List
 */
export const deleteChild = createAction(Actions.DELETE_CHILD);

/**
 * @desc Set current Child Data
 */
export const setCurrentChild = createAction(Actions.SET_CURRENT_CHILD);

/**
 * @desc Set Child Data
 */
export const setChildData = createAction(Actions.SET_CHILD_DATA);

/**
 * @desc update Child Data
 */
export const updateChildData = createAction(Actions.UPDATE_CHILD_DATA);

/**
 * @desc claer Child Data
 */
export const clearChild = createAction(Actions.CLEAR_CHILD_DATA);

/**
 * @desc Clear Child Data
 */
export const clearChildData = () => (dispatch) => {
  dispatch(setChildLoader(false));
  dispatch(setChildData(null));
  dispatch(setChildList(null));
};
