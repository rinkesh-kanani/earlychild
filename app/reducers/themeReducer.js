import { combineReducers } from 'redux';
import * as Actions from '../actions/types';
import { createReducer } from '../helpers/reduxHelpers';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_THEME_LOADER,
});

const themeListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_THEME_LIST,
});

const featuredThemeListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_FEATURED_THEME_LIST,
});

export default combineReducers({
  themeList: themeListReducer,
  loading: loadingReducer,
  featuredThemeList: featuredThemeListReducer,
});
