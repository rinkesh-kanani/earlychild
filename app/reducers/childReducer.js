import * as Actions from '../actions/types';
import { combineReducers } from 'redux';
import { createReducer } from '../helpers/reduxHelpers';
import { createReducer as createReducerOrig, current } from '@reduxjs/toolkit';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_CHILD_LOADER,
});

const currentChildReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CURRENT_CHILD,
});

const initialState = [];

const childListReducer = createReducerOrig(initialState, (builder) => {
  builder
    .addCase(Actions.SET_CHILD_LIST, (state, action) => {
      return [...(action.payload || [])];
    })
    .addCase(Actions.ADD_CHILD, (state = initialState, action) => {
      const childList = current(state);
      let list = JSON.parse(JSON.stringify(childList));
      list.push(action.payload.item);
      return list;
    })
    .addCase(Actions.DELETE_CHILD, (state = initialState, action) => {
      const childList = current(state);
      let list = JSON.parse(JSON.stringify(childList));
      list.splice(action.payload.index, 1);
      return list;
    })
    .addCase(Actions.UPDATE_CHILD, (state = initialState, action) => {
      const childList = current(state);
      let list = JSON.parse(JSON.stringify(childList));
      const childIndex = list?.findIndex((p) => p?.id === action.payload.id);
      list[childIndex] = action.payload.item;
      return list;
    });
});

const inInitialChildState = {
  id: '',
  uid: '',
  firstName: '',
  lastName: '',
  noOfWeekPremature: '',
  created_at: '',
  created_by: '',
  premature: false,
  profileLink: '',
  profile: '',
  birthDay: new Date(),
  updated_at: '',
  updated_by: '',
};

const childReducer = createReducerOrig(inInitialChildState, (builder) => {
  builder
    .addCase(Actions.SET_CHILD_DATA, (state, action) => {
      return { ...(action.payload || inInitialChildState) };
    })
    .addCase(Actions.CLEAR_CHILD_DATA, () => {
      return JSON.parse(JSON.stringify(inInitialChildState));
    })
    .addCase(Actions.UPDATE_CHILD_DATA, (state = inInitialChildState, action) => {
      let item = JSON.parse(JSON.stringify({ ...state }));
      item[action.payload.propsName] = action.payload.value;
      return { ...item };
    });
});

const childReducers = combineReducers({
  loading: loadingReducer,
  child: childReducer,
  currentChild: currentChildReducer,
  childList: childListReducer,
});

export default childReducers;
