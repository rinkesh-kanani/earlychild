import { createReducer as createReducerOrig } from '@reduxjs/toolkit';

export const createReducer = ({ initialState, actionType }) => {
  return createReducerOrig(initialState, {
    [actionType]: (state, action) => action.payload,
  });
};
