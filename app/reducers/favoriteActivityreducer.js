import * as Actions from '../actions/types';
import { combineReducers } from 'redux';
import { createReducer } from '../helpers/reduxHelpers';
import { createReducer as createReducerOrig } from '@reduxjs/toolkit';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_FAVORITE_ACTIVITY_LOADER,
});

const favoriteActivityReducer = createReducer({
  initialState: [],
  actionType: Actions.SET_FAVORITE_ACTIVITY_LIST,
});

const initialState = {
  activityId: null,
  documentId: null,
};
const favoriteactivityReducer = createReducerOrig(initialState, (builder) => {
  builder
    .addCase(Actions.SET_FAVORITE_ACTIVITY, (state, action) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.CLEAR_FAVORITE_ACTIVITY, () => {
      return JSON.parse(JSON.stringify(initialState));
    })
    .addCase(Actions.UPDATE_FAVORITE_ACTIVITY, (state = initialState, action) => {
      let item = JSON.parse(JSON.stringify({ ...state }));
      item[action.payload.propsName] = action.payload.value;
      return { ...item };
    });
});

const favoriteActivityReducers = combineReducers({
  loading: loadingReducer,
  favoriteActivityList: favoriteActivityReducer,
  favoriteActivity: favoriteactivityReducer,
});

export default favoriteActivityReducers;
