import { combineReducers } from 'redux';
import { SET_SUBJECT_LIST, UPDATE_SUBJECT, SET_SUBJECT_LOADER } from '../actions/types';
import { createReducer as createReducerOrig, current } from '@reduxjs/toolkit';
import { createReducer } from '../helpers/reduxHelpers';

const loadingReducer = createReducer({
  initialState: false,
  actionType: SET_SUBJECT_LOADER,
});

const initialState = [];
const subjectListReducer = createReducerOrig(initialState, (builder) => {
  builder
    .addCase(SET_SUBJECT_LIST, (state = initialState, action) => {
      return [...(action.payload || [])];
    })
    .addCase(UPDATE_SUBJECT, (state = initialState, action) => {
      const subjectList = current(state);
      let list = JSON.parse(JSON.stringify(subjectList));
      const subjectindex = list?.findIndex((s) => s?.slug === action.payload.slug);
      list[subjectindex] = action.payload.item;
      return list;
    });
});

export default combineReducers({
  subjectList: subjectListReducer,
  loading: loadingReducer,
});
