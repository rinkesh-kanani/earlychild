import { getAllArticles, getAllArticleTag, getFeaturedArticleContent } from '../../lib/contentful-article';
import { setArticleList, setArticleLoader, setArticleTagList, setFeaturedArticleList } from '../actions/articleActions';

export const getArticleList = () => async (dispatch) => {
  try {
    dispatch(setArticleLoader(true));
    const data = (await getAllArticles()) || [];
    const newList = [];
    data?.forEach((item) => {
      const index = newList?.findIndex((x) => x?.tagSlug === item?.tag?.slug);
      if (index === -1) {
        const newItem = {
          tagTitle: item?.tag?.title,
          tagSlug: item?.tag?.slug,
          list: [item],
        };
        newList?.push(newItem);
      } else {
        newList[index]?.list?.push(item);
      }
    });
    dispatch(setArticleList(newList));
    return newList;
  } catch (e) {
    console.log('Error : ', e);
    dispatch(setArticleLoader(false));

    return false;
  } finally {
    dispatch(setArticleLoader(false));
  }
};

export const getArticleTagList = () => async (dispatch) => {
  try {
    dispatch(setArticleLoader(true));
    const data = (await getAllArticleTag()) || [];
    dispatch(setArticleTagList(data));
    return true;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setArticleLoader(false));
  }
};

export const getFeaturedArticleList = () => async (dispatch) => {
  try {
    dispatch(setArticleLoader(true));
    const data = (await getFeaturedArticleContent()) || [];
    dispatch(setFeaturedArticleList(data));
    return true;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setArticleLoader(false));
  }
};

export const getArticleData = () => async (dispatch, getState) => {
  try {
    dispatch(setArticleLoader(true));
    const state = getState();
    return state.article?.articleList;
  } catch (e) {
    console.log('getArticleData', e);

    return false;
  } finally {
    dispatch(setArticleLoader(false));
  }
};
