import * as Actions from '../actions/types';
import { combineReducers } from 'redux';
import { createReducer } from '../helpers/reduxHelpers';
import { createReducer as createReducerOrig, current } from '@reduxjs/toolkit';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_COMPLETED_ACTIVITY_LOADER,
});

const totalCompletedActivityOfThisMonthReducer = createReducer({
  initialState: 0,
  actionType: Actions.SET_TOTAL_COMPLETED_ACTIVITY_THIS_MONTH,
});

const totalCompletedActivityReducer = createReducer({
  initialState: 0,
  actionType: Actions.SET_TOTAL_COMPLETED_ACTIVITY,
});

const initialState = [];

const completedActivityListReducer = createReducerOrig(initialState, (builder) => {
  builder
    .addCase(Actions.SET_COMPLETED_ACTIVITY_LIST, (state, action) => {
      return [...(action.payload || [])];
    })
    .addCase(Actions.ADD_COMPLETED_ACTIVITY, (state = initialState, action) => {
      let list = JSON.parse(JSON.stringify(current(state)));
      list.push(action.payload);
      return list;
    })

    .addCase(Actions.UPDATE_COMPLETED_ACTIVITY, (state = initialState, action) => {
      let list = JSON.parse(JSON.stringify(current(state)));
      const activityIndex = list?.findIndex((p) => p?.id === action.payload.id);
      list[activityIndex] = action.payload.item;
      return list;
    });
});

const initialImageListState = [];
const imageListReducer = createReducerOrig(initialImageListState, (builder) => {
  builder
    .addCase(Actions.SET_COMPLETED_ACTIVITY_IMAGE_LIST, (state, action) => {
      return [...(action.payload || [])];
    })
    .addCase(Actions.ADD_COMPLETED_ACTIVITY_IMAGE, (state = initialImageListState, action) => {
      let list = JSON.parse(JSON.stringify(current(state)));
      list.push(action.payload.item);
      return list;
    })
    .addCase(Actions.DELETE_COMPLETED_ACTIVITY_IMAGE, (state = initialImageListState, action) => {
      let list = JSON.parse(JSON.stringify(current(state)));
      list.splice(action.payload.index, 1);
      return list;
    });
});

const initialSortedState = [];

const sortedCompletedActivityListReducer = createReducerOrig(initialSortedState, (builder) => {
  builder
    .addCase(Actions.SET_SORTED_COMPLETED_ACTIVITY_LIST, (state, action) => {
      return [...(action.payload || [])];
    })
    .addCase(Actions.ADD_COMPLETED_ACTIVITY, (state = initialSortedState, action) => {
      let list = JSON.parse(JSON.stringify(current(state)));
      list.push(action.payload);
      return list;
    })

    .addCase(Actions.UPDATE_COMPLETED_ACTIVITY, (state = initialSortedState, action) => {
      let list = JSON.parse(JSON.stringify(current(state)));
      const activityIndex = list?.findIndex((p) => p?.id === action.payload.id);
      list[activityIndex] = action.payload.item;
      return list;
    });
});
const completedActivityReducers = combineReducers({
  loading: loadingReducer,
  completeActivityList: completedActivityListReducer,
  sortedCompleteActivityList: sortedCompletedActivityListReducer,
  imageList: imageListReducer,
  TotalCompletedActivityOfThisMonth: totalCompletedActivityOfThisMonthReducer,
  TotalCompletedActivity: totalCompletedActivityReducer,
});

export default completedActivityReducers;
