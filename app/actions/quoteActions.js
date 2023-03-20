import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set inspiration Quote Loader
 */
export const setnQuoteLoader = createAction(Actions.SET_QUOTE_LOADER);

/**
 * @desc set  Quote List
 */
export const setQuoteList = createAction(Actions.SET_QUOTE_LIST);

export const clearQuotesData = () => (dispatch) => {
  dispatch(setnQuoteLoader(false));
  dispatch(setQuoteList(null));
};
