import { getAllMilestoneList, getMilestone } from '../../lib/contentful-milestone';
import { getAllTaskOfMilestone, getAllTaskOfMilestoneList } from '../../lib/contentful-milestonetask';
import {
  setCurrentMilestone,
  setMilestoneList,
  setMilestoneLoader,
  setMilestoneTaskList,
} from '../actions/milestoneActions';
import { MILESTONE_LIST } from '../constants/constant';
import ChildSkillService from '../dbservices/childSkillDbService';
import { getCurrentUserId } from './userService';

export const getCurrentMilestone = (slug) => async (dispatch) => {
  try {
    dispatch(setMilestoneLoader(true));
    const data = (await getMilestone(slug)) || [];
    dispatch(setCurrentMilestone(data));

    return true;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setMilestoneLoader(false));
  }
};

export const getAllMilestone = () => async (dispatch) => {
  try {
    dispatch(setMilestoneLoader(true));
    const data = (await getAllMilestoneList()) || [];
    const milestoneTaskList = await getAllTaskOfMilestoneList();

    let milestoneList = [];
    const milestones = Object.keys(MILESTONE_LIST);
    milestones?.map((milstoneItem) => {
      const findindex = data?.findIndex((x) => x?.slug === milstoneItem);
      if (findindex !== -1) {
        const milestoneTask = milestoneTaskList?.filter((x) => x?.milestone?.slug === milstoneItem);

        let newList = [];
        milestoneTask?.forEach((item) => {
          const subject = item?.subject?.title;
          const index = newList?.findIndex((x) => x?.subject === subject);

          if (index !== -1) {
            newList[index]?.tasks?.push(item);
          } else {
            const newMilestoneItem = {
              subject,
              slug: item?.subject?.slug,
              tasks: [item],
            };
            newList?.push(newMilestoneItem);
          }
        });

        const newItem = {
          milestone: data?.[findindex],
          milestoneTaskList: newList,
        };
        milestoneList?.push(newItem);
      }
    });
    dispatch(setMilestoneList(milestoneList));
    return true;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setMilestoneLoader(false));
  }
};

export const getMilestoneTaskList = (childId, slug) => async (dispatch) => {
  try {
    dispatch(setMilestoneLoader(true));
    const userId = getCurrentUserId();
    const data = (await getAllTaskOfMilestone(slug)) || [];
    // const state = getState();
    // const childMilestoneList = state.milestone?.childMilestoneList;
    const childMilestoneList = await ChildSkillService.getInstance()?.getChildSkillDocuments(userId, childId);

    let newList = [];
    await data?.forEach((item) => {
      const subject = item?.subject?.title;
      const index = newList?.findIndex((x) => x?.subject === subject);
      const isCompleteIndex = childMilestoneList?.findIndex((x) => x?.milestoneSkillId === item?.sys?.id);
      let newItem;

      if (isCompleteIndex !== -1)
        newItem = { ...item, isCheck: true, skillId: childMilestoneList?.[isCompleteIndex]?.id };
      else newItem = { ...item, ischeck: false };

      if (index !== -1) {
        newList[index]?.tasks?.push(newItem);
      } else {
        const newMilestoneItem = {
          subject,
          slug: item?.subject?.slug,
          tasks: [newItem],
          isOpen: false,
        };
        newList?.push(newMilestoneItem);
      }
    });

    dispatch(setMilestoneTaskList(newList));
    return true;
  } catch (e) {
    console.log('Error : ', e);
    return false;
  } finally {
    dispatch(setMilestoneLoader(false));
  }
};
