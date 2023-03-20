import moment from 'moment';
import {
  setCompletedActivityList,
  setCompletedActivityLoader,
  setSortedCompletedActivityList,
  setTotalCompletedActivity,
  setTotalCompletedActivityOfThisMonth,
} from '../actions/completedActivityActions';
import CompletedActivityService from '../dbservices/completedActivityDbService';
import { getCurrentUserId } from './userService';

/**
 * @desc CompletedActivity - Create Completed Activity New Document
 * @param {*}
 */
export const createCompletedActivityNewDocument = (payload) => async (dispatch) => {
  try {
    dispatch(setCompletedActivityLoader(true));
    const userId = getCurrentUserId();
    const response = await CompletedActivityService.getInstance()?.create(userId, payload);
    if (response) {
      dispatch(setCompletedActivityLoader(false));
      return response;
    }
  } catch (e) {
    console.log('createCompletedActivityNewDocument', e);
    return false;
  } finally {
    dispatch(setCompletedActivityLoader(false));
  }
};

/**
 * @desc CompletedActivity -Get all Completed Activity of Current User
 * @param {*}
 */
export const getAllCompletedActivityDocuments = () => async (dispatch) => {
  try {
    dispatch(setCompletedActivityLoader(true));
    const userId = getCurrentUserId();
    const response = await CompletedActivityService.getInstance()?.getByuserId(userId);
    if (response) {
      dispatch(setCompletedActivityList(response));

      let newList = [];
      await response?.forEach((item) => {
        const monthYear = moment(item?.compltedDatetime).format('MMMM YYYY');

        const index = newList?.findIndex((item) => item?.date === monthYear);
        if (index !== -1) {
          newList[index]?.list?.push(item);
        } else {
          const newItem = {
            date: monthYear,
            datetime: new Date(item?.compltedDatetime),
            list: [item],
          };
          newList?.push(newItem);
        }
      });

      newList?.sort((a, b) => b?.datetime - a?.datetime);
      dispatch(setSortedCompletedActivityList(newList));
      const currentMonth = moment().format('MMMM YYYY');

      const totalActivityOfthisMonth = response?.filter((item) => {
        if (moment(item?.compltedDatetime).format('MMMM YYYY') === currentMonth) return true;
        return false;
      })?.length;
      dispatch(setTotalCompletedActivityOfThisMonth(totalActivityOfthisMonth));
      dispatch(setTotalCompletedActivity(response?.length));

      return true;
    }
  } catch (e) {
    console.log('getUserAllDocument', e);
    dispatch(setCompletedActivityLoader(false));
    return false;
  } finally {
    dispatch(setCompletedActivityLoader(false));
  }
};
