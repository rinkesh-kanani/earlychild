import { setChildMilestoneTaskList, setMilestoneLoader } from '../actions/milestoneActions';
import ChildSkillService from '../dbservices/childSkillDbService';
import { getCurrentUserId } from './userService';
/**
 * @desc User - Get User Documents
 * @param {*}
 */
export const getChildSkillAllDocument = (childId) => async (dispatch) => {
  try {
    dispatch(setMilestoneLoader(true));
    const userId = getCurrentUserId();
    const response = await ChildSkillService.getInstance()?.getChildSkillDocuments(userId, childId);
    if (response) {
      dispatch(setChildMilestoneTaskList(response));
      return response;
    }
  } catch (e) {
    dispatch(setMilestoneLoader(false));

    console.log('getChildSkillAllDocument', e);
    return false;
  } finally {
    dispatch(setMilestoneLoader(false));
  }
};

/**
 * @desc User - Create User New Document
 * @param {*}
 */
export const createChildSkillNewDocument = (payload) => async (dispatch) => {
  try {
    dispatch(setMilestoneLoader(true));
    const userId = getCurrentUserId();
    const response = await ChildSkillService.getInstance()?.create(userId, payload);
    if (response) {
      return response;
    }
  } catch (e) {
    console.log('createChildSkillNewDocument', e);
    dispatch(setMilestoneLoader(false));

    return false;
  } finally {
    dispatch(setMilestoneLoader(false));
  }
};

/**
 * @desc User - Delete User Document
 * @param {*}
 */
export const deleteChildSkillDocument = (id) => async (dispatch) => {
  try {
    dispatch(setMilestoneLoader(true));
    const response = await ChildSkillService.getInstance()?.delete(id);
    if (response) {
      return response;
    }
  } catch (e) {
    console.log('deleteChildSkillDocument', e);
    dispatch(setMilestoneLoader(false));

    return false;
  } finally {
    dispatch(setMilestoneLoader(false));
  }
};
