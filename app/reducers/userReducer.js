import * as Actions from '../actions/types';
import { combineReducers } from 'redux';
import { createReducer } from '../helpers/reduxHelpers';
import { createReducer as createReducerOrig } from '@reduxjs/toolkit';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_USER_LOADER,
});

const inInitialState = {
  id: '',
  uid: '',
  created_at: '',
  created_by: '',
  email: '',
  firstName: '',
  lastName: '',
  updated_at: '',
  updated_by: '',
};

const userReducer = createReducerOrig(inInitialState, (builder) => {
  builder
    .addCase(Actions.SET_USER_DATA, (state, action) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.UPDATE_USER_DATA, (state, action) => {
      const info = { ...state };
      info[action.payload.propsName] = action.payload.value;
      return { ...info };
    });
});

const userReducers = combineReducers({
  loading: loadingReducer,
  user: userReducer,
});

export default userReducers;
