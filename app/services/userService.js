import { clearUserData, setUserData, setUserLoader } from '../actions/userActions';
import UserService from '../dbservices/userDbService';
import auth from '@react-native-firebase/auth';
import { clearAuthData } from '../actions/authActions';
import { clearActivityData } from '../actions/activityActions';
import { clearArticleData } from '../actions/articleActions';
import { clearAgeData } from '../actions/ageActions';
import { clearSubjectData } from '../actions/subjectActions';
import { clearThemeData } from '../actions/themeActions';
import { clearLocalData } from '../utils/authTokenHelpers';
import { clearChildData } from '../actions/childActions';
import { clearCompletedActivityData } from '../actions/completedActivityActions';
import asyncStorageHelpers from '../helpers/asyncStorageHelpers';
import { clearMindfulPlaytimeData } from '../actions/minfulPlaytimeActions';
import { clearQuotesData } from '../actions/quoteActions';
import { clearAppData } from '../actions/appActions';

/**
 * @desc User - get current user id
 */
export const getCurrentUserId = () => {
  const user = auth().currentUser;
  if (user) {
    return user?.uid;
  }

  return undefined;
};

/**
 * @desc User - get user document id
 */

export const getUserDocId = (userId) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const userData = await UserService.getInstance()?.getSingleUser(userId);
    if (userData?.id) return userData?.id;
    return undefined;
  } catch (error) {
    dispatch(setUserLoader(false));
    console.log('getuserDocId', error);
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - get user document id
 */

export const isExistUserName = () => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const userId = getCurrentUserId();

    const userData = await UserService.getInstance()?.getSingleUser(userId);
    if (userData?.firstName) return true;
    return false;
  } catch (error) {
    dispatch(setUserLoader(false));
    console.log('isExistUserName', error);
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};
/**
 * User - get current user data
 */
export const setCurrentUser = (userId, id) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const userData = await UserService.getInstance().getSingle(id);
    if (userData) {
      dispatch(setUserData(userData));
      return true;
    } else return false;
  } catch (error) {
    dispatch(setUserLoader(false));
    console.log('getCurrentUser', error);
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - Get User Documents
 * @param {*}
 */
export const getUserAllDocument = () => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await UserService.getInstance()?.getUserDocuments();
    if (response) {
      dispatch(setUserLoader(false));
      return response;
    }
  } catch (e) {
    console.log('getUserAllDocument', e);
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - Create User New Document
 * @param {*}
 */
export const createUserNewDocument = (userId, payload) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await UserService.getInstance()?.create(userId, payload);
    if (response) {
      dispatch(setUserLoader(false));
      return response;
    }
  } catch (e) {
    console.log('createUserNewDocument', e);
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - Update User Document
 * @param {*}
 */
export const updateUserDocument = (userId, id, payload) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await UserService.getInstance()?.update(userId, id, payload);
    if (response) {
      dispatch(setUserLoader(false));
      return response;
    }
  } catch (e) {
    console.log('updateUserDocument', e);
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - Delete User Document
 * @param {*}
 */
export const deleteUserDocument = (id) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await UserService.getInstance()?.delete(id);
    if (response) {
      dispatch(setUserLoader(false));
      return response;
    }
  } catch (e) {
    console.log('deleteUserDocument', e);
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};
/**
 * @desc User - check user Password is same or not
 */

export const IsPasswordMatch = (userId, password) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const userData = await UserService.getInstance()?.getSingleUser(userId);
    if (userData) return userData.password === password;
    return undefined;
  } catch (error) {
    dispatch(setUserLoader(false));
    console.log('IsPasswordMatch', error);
  } finally {
    dispatch(setUserLoader(false));
  }
};
export const logout = () => async (dispatch) => {
  try {
    await auth().signOut();

    //clear local data
    clearLocalData();
    await asyncStorageHelpers.clearLocalKeys();

    //clear reducer data
    dispatch(clearAuthData());
    dispatch(clearUserData());
    dispatch(clearChildData());
    dispatch(clearActivityData());
    dispatch(clearCompletedActivityData());
    dispatch(clearAgeData());
    dispatch(clearArticleData());
    dispatch(clearSubjectData());
    dispatch(clearThemeData());
    dispatch(clearMindfulPlaytimeData());
    dispatch(clearQuotesData());
    dispatch(clearAppData());

    return true;
  } catch (e) {
    console.log('Error', e);
    return false;
  }
};
