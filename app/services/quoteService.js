import { getMindfulPlaytime } from '../../lib/contentful-mindfulPlaytime';
import { getQuote } from '../../lib/contentful-quotes';
import { setnQuoteLoader, setQuoteList } from '../actions/quoteActions';

export const getQuoteList = () => async (dispatch) => {
  try {
    dispatch(setnQuoteLoader(true));
    const data = (await getQuote()) || {};
    dispatch(setQuoteList(data));
    return true;
  } catch (e) {
    console.log('Error : ', e);
    dispatch(setnQuoteLoader(false));

    return false;
  } finally {
    dispatch(setnQuoteLoader(false));
  }
};
