import { combineReducers } from 'redux';
import * as Actions from '../actions/types';

import { createReducer } from '../helpers/reduxHelpers';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_ARTICLE_LOADER,
});
const articleListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_ARTICLE_LIST,
});

const filterArticleListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_FILTER_ARTICLE_LIST,
});

const articleTagListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_ARTICLE_TAG_LIST,
});

const featuredArticleListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_FEATURED_ARTICLE_LIST,
});

export default combineReducers({
  articleList: articleListReducer,
  filterArticleList: filterArticleListReducer,
  articleTagList: articleTagListReducer,
  featuredArticleList: featuredArticleListReducer,
  loading: loadingReducer,
});
