import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';
/**
 * @desc Set Article Loader
 */
export const setArticleLoader = createAction(Actions.SET_ARTICLE_LOADER);
/**
 * @desc set article list
 */
export const setArticleList = createAction(Actions.SET_ARTICLE_LIST);
/**
 * @desc set filter article list
 */
export const setFilterArticleList = createAction(Actions.SET_FILTER_ARTICLE_LIST);
/**
 * @desc set article tag list
 */
export const setArticleTagList = createAction(Actions.SET_ARTICLE_TAG_LIST);
/**
 * @desc set filter article list
 */
export const setFeaturedArticleList = createAction(Actions.SET_FEATURED_ARTICLE_LIST);

/**
 * @desc clear article data
 */
export const clearArticleData = () => (dispatch) => {
  dispatch(setArticleLoader(false));
  dispatch(setArticleList(null));
  dispatch(setFilterArticleList(null));
  dispatch(setArticleTagList(null));
};
