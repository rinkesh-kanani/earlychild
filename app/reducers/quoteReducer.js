import { combineReducers } from 'redux';
import * as Actions from '../actions/types';
import { createReducer } from '../helpers/reduxHelpers';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_QUOTE_LOADER,
});

const quoteListReducer = createReducer({
  initialState: {},
  actionType: Actions.SET_QUOTE_LIST,
});

export default combineReducers({
  loading: loadingReducer,
  quoteList: quoteListReducer,
});
