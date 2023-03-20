import { combineReducers } from 'redux';
import { UPDATE_AGE, SET_AGE_LIST, SET_TYPE_OF_ACTIVITY_LIST, UPDATE_TYPE_OF_ACTIVITY } from '../actions/types';
import { createReducer as createReducerOrig, current } from '@reduxjs/toolkit';

const initialState = [];
const ageListReducer = createReducerOrig(initialState, (builder) => {
  builder
    .addCase(SET_AGE_LIST, (state = initialState, action) => {
      return [...(action.payload || state)];
    })
    .addCase(UPDATE_AGE, (state = initialState, action) => {
      const ageList = current(state);
      let list = JSON.parse(JSON.stringify(ageList));
      const subjectindex = list?.findIndex((s) => s?.year === action.payload.year);
      list[subjectindex] = action.payload.item;
      return list;
    });
});

const typeOfActivityInitialState = [];

const typeOfActivityListReducer = createReducerOrig(typeOfActivityInitialState, (builder) => {
  builder
    .addCase(SET_TYPE_OF_ACTIVITY_LIST, (state = typeOfActivityInitialState, action) => {
      return [...(action.payload || state)];
    })
    .addCase(UPDATE_TYPE_OF_ACTIVITY, (state = initialState, action) => {
      const typeOfActivityList = current(state);
      let list = JSON.parse(JSON.stringify(typeOfActivityList));
      const activityIndex = list?.findIndex((s) => s?.activityType === action.payload.activityType);
      list[activityIndex] = action.payload.item;
      return list;
    });
});

export default combineReducers({
  ageList: ageListReducer,
  typeOfActivityList: typeOfActivityListReducer,
});
