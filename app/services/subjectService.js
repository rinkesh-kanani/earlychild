import { getAllSubjects } from '../../lib/contentful-subject';
import { setSubjectList } from '../actions/subjectActions';

export const getSubjectList =
  (isOrder = false) =>
  async (dispatch) => {
    try {
      const data = (await getAllSubjects(isOrder)) || [];
      const newData = data?.map((item) => {
        return { ...item, isChecked: false };
      });
      dispatch(setSubjectList(newData));
      return true;
    } catch (e) {
      console.log('Error : ', e);
      return false;
    }
  };
