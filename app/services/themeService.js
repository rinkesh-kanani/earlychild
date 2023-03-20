import { getAllThemes, getFeaturedThemes } from '../../lib/contentful-themes';
import { setFeaturedThemeList, setThemeList, setThemeLoader } from '../actions/themeActions';

export const getThemeList = () => async (dispatch) => {
  try {
    dispatch(setThemeLoader(true));
    const data = (await getAllThemes()) || [];
    dispatch(setThemeList(data));
    return true;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setThemeLoader(false));
  }
};

export const getFeaturedThemeList = () => async (dispatch) => {
  try {
    dispatch(setThemeLoader(true));
    const data = (await getFeaturedThemes()) || [];
    dispatch(setFeaturedThemeList(data));
    return true;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setThemeLoader(false));
  }
};
