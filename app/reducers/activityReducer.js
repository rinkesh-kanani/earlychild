import { combineReducers } from 'redux';
import * as Actions from './../actions/types';
import { createReducer } from '../helpers/reduxHelpers';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_ACTIVITY_LOADER,
});

const activityListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_ACTIVITY_LIST,
});

const filterActivityListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_FILTER_ACTIVITY_LIST,
});

const themeActivityListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_THEME_ACTIVITY_LIST,
});

const activityItemReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_ACTIVITY_ITEM,
});

const milestoneTaskActivityListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_MILESTONE_TASK_ACTIVITY_LIST,
});

const childActivityListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CHILD_ACTIVITY_LIST,
});

const todayActivityListReducer = createReducer({
  initialState: [],
  actionType: Actions.SET_TODAY_ACTIVITY_LIST,
});

const justAddedActivityListReducer = createReducer({
  initialState: [],
  actionType: Actions.SET_JUST_ADDED_ACTIVITY_LIST,
});

export default combineReducers({
  loading: loadingReducer,
  activityList: activityListReducer,
  childActivityList: childActivityListReducer,
  filterActivityList: filterActivityListReducer,
  themeActivityList: themeActivityListReducer,
  activityItem: activityItemReducer,
  milestoneTaskActivityList: milestoneTaskActivityListReducer,
  todayActivityList: todayActivityListReducer,
  justAddedActivityList: justAddedActivityListReducer,
});
