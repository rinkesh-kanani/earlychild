import { setUserLoader } from '../actions/userActions';
import ChildService from '../dbservices/childDbService';
import { setChildList, setChildLoader, setCurrentChild } from '../actions/childActions';
import { getCurrentUserId } from './userService';
import { calculateAge, calculateMilestone, calculateMilestoneAge } from '../helpers/helpers';
import { getChildSkillAllDocument } from './childSkillService';
import asyncStorageHelpers from '../helpers/asyncStorageHelpers';

/**
 * @desc Child -set current child
 * @param {*}
 */
export const setCurrentChildData = (child) => async (dispatch) => {
  try {
    dispatch(setChildLoader(true));
    const milestone = calculateMilestone(child?.birthDay, child?.noOfWeekPremature);
    const age = calculateAge(child?.birthDay);

    const newChild = { ...child, milestone, age };
    await dispatch(setCurrentChild(newChild));
    await asyncStorageHelpers.setCurrentChild(newChild);
    await dispatch(getChildSkillAllDocument(child?.id));
    return true;
  } catch (e) {
    console.log('getChildAllDocument', e);
    return false;
  } finally {
    dispatch(setChildLoader(false));
  }
};

/**
 * @desc Child -Get all child of Current User
 * @param {*}
 */
export const setAllChildDocuments = () => async (dispatch) => {
  try {
    dispatch(setChildLoader(true));
    const userId = getCurrentUserId();
    const response = await ChildService.getInstance()?.getByuserId(userId);
    if (response) {
      let newList = [];

      response?.forEach((item) => {
        const milestone = calculateMilestone(item?.birthDay, item?.noOfWeekPremature);
        const age = calculateAge(item?.birthDay);
        const milestoneAge = calculateMilestoneAge(item?.birthDay, item?.noOfWeekPremature);
        newList.push({ ...item, milestone, age, milestoneAge });
      });
      newList?.sort((a, b) => new Date(b?.birthDay) - new Date(a?.birthDay));
      dispatch(setChildList(newList));
      return newList;
    }
  } catch (e) {
    console.log('getChildAllDocument', e);
    return false;
  } finally {
    dispatch(setChildLoader(false));
  }
};

/**
 * @desc Child - Create Child New Document
 * @param {*}
 */
export const createChildNewDocument = (payload) => async (dispatch) => {
  try {
    dispatch(setChildLoader(true));
    const userId = getCurrentUserId();
    const response = await ChildService.getInstance()?.create(userId, payload);
    if (response) {
      dispatch(setUserLoader(false));
      return response;
    }
  } catch (e) {
    console.log('createChildNewDocument', e);
    return false;
  } finally {
    dispatch(setChildLoader(false));
  }
};

/**
 * @desc Child - Update Child Document
 * @param {*}
 */
export const updateChildDocument = (userId, id, payload) => async (dispatch) => {
  try {
    dispatch(setChildLoader(true));
    const response = await ChildService.getInstance()?.update(userId, id, payload);
    if (response) {
      dispatch(setChildLoader(false));
      return response;
    }
  } catch (e) {
    console.log('updateChildDocument', e);
    return false;
  } finally {
    dispatch(setChildLoader(false));
  }
};

/**
 * @desc Child - Delete Child Document
 * @param {*}
 */
export const deleteChildDocument = (id) => async (dispatch) => {
  try {
    dispatch(setChildLoader(true));
    const response = await ChildService.getInstance()?.delete(id);
    if (response) {
      dispatch(setChildLoader(false));
      return response;
    }
  } catch (e) {
    console.log('deleteChildDocument', e);
    return false;
  } finally {
    dispatch(setChildLoader(false));
  }
};

/**
 * @desc Check current user's child exist or not
 */

export const isExistChild = () => async (dispatch) => {
  try {
    dispatch(setChildLoader(true));
    const uid = getCurrentUserId();

    const response = await ChildService.getInstance()?.isExistUser(uid);
    if (response) {
      dispatch(setChildLoader(false));
      return response;
    }
  } catch (e) {
    console.log('getUserAllDocument', e);
    return false;
  } finally {
    dispatch(setChildLoader(false));
  }
};

export const getCurrentChildData = () => async (dispatch, getState) => {
  try {
    dispatch(setChildLoader(true));
    const state = getState();
    return state.child?.currentChild;
  } catch (e) {
    console.log('getCurrentChildData', e);

    return false;
  } finally {
    dispatch(setChildLoader(false));
  }
};
