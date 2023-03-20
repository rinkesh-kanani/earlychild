import { getAllActivities } from '../../lib/contentful-activity';
import { setCompletedActivityLoader } from '../actions/completedActivityActions';
import { setFavoriteActivityList, setFavoriteActivityLoader } from '../actions/favoriteActivityaction';
import FavoriteActivityService from '../dbservices/favoriteActivityDbService';
import { getActivityData } from './activityservice';
import { getCurrentUserId } from './userService';

/**
 * @desc Favorite Activity - Create Favorite Activity New Document
 * @param {*}
 */
export const createFavoriteActivityNewDocument = (payload) => async (dispatch) => {
  try {
    dispatch(setFavoriteActivityLoader(true));
    const userId = getCurrentUserId();
    const response = await FavoriteActivityService.getInstance()?.create(userId, payload);
    if (response) {
      dispatch(setFavoriteActivityLoader(false));
      return response;
    }
  } catch (e) {
    console.log('createFavoriteActivityNewDocument', e);
    return false;
  } finally {
    dispatch(setFavoriteActivityLoader(false));
  }
};

/**
 * @desc FavoriteActivity -Get all Favorite Activity of Current User
 * @param {*}
 */
export const getAllFavoriteActivityDocuments = () => async (dispatch) => {
  try {
    dispatch(setCompletedActivityLoader(true));
    const userId = getCurrentUserId();
    const response = await FavoriteActivityService.getInstance()?.getByuserId(userId);
    const actiivityList = (await getActivityData()) || [];

    if (response) {
      const newList = [];
      response?.forEach((item) => {
        const index = actiivityList?.findIndex((x) => x?.sys?.id === item?.activityId);
        if (index !== -1) {
          const newItem = {
            ...item,
            banner: actiivityList?.[index]?.banner,
            title: actiivityList?.[index]?.title,
            slug: actiivityList?.[index]?.slug,
          };
          newList.push(newItem);
        }
      });
      dispatch(setFavoriteActivityList(newList));
      return true;
    }
  } catch (e) {
    console.log('getAllFavoriteActivityDocuments', e);
    dispatch(setCompletedActivityLoader(false));
    return false;
  } finally {
    dispatch(setCompletedActivityLoader(false));
  }
};

/**
 * @desc Favorite activity - Delete Document
 * @param {*}
 */
export const deleteFavoriteActivityDocument = (id) => async (dispatch) => {
  try {
    dispatch(setFavoriteActivityLoader(true));
    const response = await FavoriteActivityService.getInstance()?.delete(id);
    if (response) {
      return response;
    }
  } catch (e) {
    console.log('deleteFavoriteActivityDocument', e);
    dispatch(setFavoriteActivityLoader(false));

    return false;
  } finally {
    dispatch(setFavoriteActivityLoader(false));
  }
};

export const getFavoriteActivityData = () => async (dispatch, getState) => {
  try {
    dispatch(setFavoriteActivityLoader(true));
    const state = getState();
    return state.favoriteActivity?.favoriteActivityList;
  } catch (e) {
    console.log('getFavoriteActivityData', e);

    return false;
  } finally {
    dispatch(setFavoriteActivityLoader(false));
  }
};
