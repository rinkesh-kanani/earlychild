import { isEmpty } from 'lodash';
import { getActivityDetail, getAllActivitiesWithPagination } from '../../lib/contentful-activity';
import { getAllActivityOfMilestoneTask } from '../../lib/contentful-milestonetask';
import {
  setActivityItem,
  setActivityList,
  setActivityLoader,
  setChildActivityList,
  setJustAddedActivityList,
  setMilestoneTaskActivityList,
  setThemeActivityList,
  setTodayctivityList,
} from '../actions/activityActions';
import {
  JUST_ADDED_ACTIVITY_LIST_SIZE,
  NO_OF_ACTIVITY_PER_PAGE,
  SPECIFIC_CHILD_ACTIVITY_LIST_SIZE,
  SUBJECT,
  THEME,
  TODAY_ACTIVITY_LIST_SIZE,
} from '../constants/constant';
import { getRandomIndex } from '../helpers/helpers';

// export const getActivityList = () => async (dispatch) => {
//   try {
//     dispatch(setActivityLoader(true));
//     const data = (await getAllActivities()) || [];
//     dispatch(setActivityList(data));
//     return data;
//   } catch (e) {
//     console.log('Error : ', e);
//     return false;
//   } finally {
//     dispatch(setActivityLoader(false));
//   }
// };

export const getJustActivityList = () => async (dispatch, getState) => {
  try {
    dispatch(setActivityLoader(true));
    const state = getState();
    const activityList = state.activity?.activityList;
    const justAddedActivityList = activityList?.slice(0, JUST_ADDED_ACTIVITY_LIST_SIZE);
    await dispatch(setJustAddedActivityList(justAddedActivityList));
  } catch (error) {
    console.log('getJustActivityList', error);
    dispatch(setActivityLoader(false));
  } finally {
    dispatch(setActivityLoader(false));
  }
};

export const getAllActivity = () => async (dispatch) => {
  try {
    dispatch(setActivityLoader(true));
    let ActivityList = [];
    let data = [];
    let page = 0;
    do {
      const skip = page * NO_OF_ACTIVITY_PER_PAGE;
      data = (await getAllActivitiesWithPagination(skip)) || [];
      if (data?.length !== NO_OF_ACTIVITY_PER_PAGE) break;
      else {
        ActivityList = ActivityList.concat(data);
        page++;
      }
    } while (!isEmpty(data));
    dispatch(setActivityList(ActivityList));
    return true;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setActivityLoader(false));
  }
};

export const getChildActivityList = (childList) => async (dispatch, getState) => {
  try {
    const state = getState();
    const activityList = state.activity?.activityList;
    const childWiseActivityList = [];
    childList?.reduceRight((_, item) => {
      const childActivityList = activityList?.filter((element) => element?.age <= item?.milestoneAge);
      const totalActivity = childActivityList?.length;
      let newItem = {
        id: item?.id,
        firstName: item?.firstName,
      };
      if (totalActivity <= SPECIFIC_CHILD_ACTIVITY_LIST_SIZE) {
        newItem['list'] = childActivityList;
      } else {
        const activityIndexList = getRandomIndex(totalActivity, TODAY_ACTIVITY_LIST_SIZE, item?.birthDay);
        const newList = [];
        activityIndexList?.forEach((index) => newList.push(childActivityList[index]));
        newItem['list'] = newList;
      }

      childWiseActivityList?.push(newItem);
    }, null);
    await dispatch(setChildActivityList(childWiseActivityList));
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setActivityLoader(false));
  }
};

export const getActivityListOfTheme = (type, slug) => async (dispatch) => {
  try {
    dispatch(setActivityLoader(true));

    const data = (await dispatch(getActivityData())) || [];

    let activityList = [];
    if (type === THEME) {
      activityList = data?.filter((item) => item?.themesCollection?.items?.some((element) => element?.slug === slug));
    } else if (type === SUBJECT) {
      activityList = data?.filter((item) => item?.subjectCollection?.items?.some((element) => element?.slug === slug));
    }
    dispatch(setThemeActivityList(activityList));
    return activityList;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setActivityLoader(false));
  }
};

export const getActivityItem = (slug) => async (dispatch) => {
  try {
    dispatch(setActivityLoader(true));
    const data = (await getActivityDetail({ slug })) || {};
    dispatch(setActivityItem(data));
    return data;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setActivityLoader(false));
  }
};

export const getMilestoneTaskActivityList = (milestone, subject, milestoneId) => async (dispatch) => {
  try {
    dispatch(setActivityLoader(true));
    const activityList = (await getAllActivityOfMilestoneTask(milestoneId)) || {};
    dispatch(setMilestoneTaskActivityList(activityList));
    return true;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setActivityLoader(false));
  }
};

export const getTodayActivityList = (birthday) => async (dispatch) => {
  try {
    const date = new Date();
    const birthDate = new Date(birthday);
    const age = Math.floor(
      (date.getMonth() - birthDate.getMonth() + 12 * (date.getFullYear() - birthDate.getFullYear())) / 12,
    );

    dispatch(setActivityLoader(true));
    const data = (await dispatch(getActivityData())) || [];

    const activityList = data?.filter((item) => item?.age <= age);
    const totalActivity = activityList?.length;
    if (totalActivity <= TODAY_ACTIVITY_LIST_SIZE) dispatch(setTodayctivityList(activityList));
    else {
      const activityIndexList = getRandomIndex(totalActivity, TODAY_ACTIVITY_LIST_SIZE, birthday);
      const newList = [];
      activityIndexList?.forEach((index) => newList.push(activityList[index]));
      dispatch(setTodayctivityList(newList));
    }
    return true;
  } catch (e) {
    console.log('getTodayActivityList : ', e);
    return false;
  } finally {
    dispatch(setActivityLoader(false));
  }
};

export const sortByMostRelevant = (activityList, milestoneList) => {
  const m = activityList?.length;
  const n = milestoneList?.length;
  // The temp array is used to store a copy
  // of activityList[] and visited[] is used to mark the visited elements in temp[].
  let temp = [];
  let visited = [];
  let index = 0;

  function first(arr, low, high, x, n) {
    if (high >= low) {
      let mid = low + Math.floor((high - low) / 2);

      if ((mid == 0 || x > arr[mid - 1]?.milestone?.slug) && arr[mid]?.milestone?.slug === x) return mid;
      if (x > arr[mid]?.milestone?.slug) return first(arr, mid + 1, high, x, n);
      return first(arr, low, mid - 1, x, n);
    }
    return -1;
  }

  for (let i = 0; i < m; i++) {
    temp[i] = activityList[i];
    visited[i] = 0;
  }

  // Sort elements in temp
  temp.sort(function (a, b) {
    if (a?.milestone?.slug > b?.milestone?.slug) {
      return 1;
    }
    if (a?.milestone?.slug < b?.milestone?.slug) {
      return -1;
    }
    return 0;
  });

  // Consider all elements of milestoneList[], find them in temp[] and copy to activityList[] in order.
  for (let i = 0; i < n; i++) {
    // Find index of the first occurrence
    // of milestoneList[i] in temp
    let firstOccur = first(temp, 0, m - 1, milestoneList[i], m);
    // If not present, no need to proceed
    if (firstOccur === -1) {
      continue;
    }
    // Copy all occurrences of milestoneList[i] to activityList[]
    for (let j = firstOccur; j < m && temp[j]?.milestone?.slug === milestoneList[i]; j++) {
      activityList[index++] = temp[j];
      visited[j] = 1;
    }
  }
  // Now copy all items of temp[] which are
  // not present in milestoneList[]
  for (let i = 0; i < m; i++) {
    if (visited[i] === 0) activityList[index++] = temp[i];
  }

  return activityList;
};

export const getActivityData = () => async (dispatch, getState) => {
  try {
    dispatch(setActivityLoader(true));
    const state = getState();
    return state.activity?.activityList;
  } catch (e) {
    console.log('getActivityData', e);

    return false;
  } finally {
    dispatch(setActivityLoader(false));
  }
};
