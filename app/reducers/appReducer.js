import { combineReducers } from 'redux';
import { APP__SET_LOADING, SET_PROFILE_ROOT } from '../actions/types';
import { createReducer } from '../helpers/reduxHelpers';

const loadingReducer = createReducer({
  initialState: false,
  actionType: APP__SET_LOADING,
});

const profileRootReducer = createReducer({
  initialState: false,
  actionType: SET_PROFILE_ROOT,
});
export default combineReducers({
  loading: loadingReducer,
  profileRoot: profileRootReducer,
});
