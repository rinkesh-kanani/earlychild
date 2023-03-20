import { setAgeList, setTypeOfActivityList } from '../actions/ageActions';
import { ages, typeOfActivity } from '../data/raw';

export const getAgeList = () => async (dispatch) => {
  try {
    dispatch(setAgeList(ages));
    return true;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  }
};

export const getTypeOfActivityList = () => async (dispatch) => {
  try {
    dispatch(setTypeOfActivityList(typeOfActivity));
    return true;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  }
};
