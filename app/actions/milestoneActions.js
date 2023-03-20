import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc set  Milestone Task Loader
 */
export const setMilestoneLoader = createAction(Actions.SET_MILESTONE_TASK_LOADER);
/**
 * @desc set current Milestone
 */
export const setCurrentMilestone = createAction(Actions.SET_CURRENT_MILESTONE);

/**
 * @desc set Milestone List
 */
export const setMilestoneList = createAction(Actions.SET_MILESTONE_LIST);
/**
 * @desc set  Milestone Task List
 */
export const setMilestoneTaskList = createAction(Actions.SET_MILESTONE_TASK_LIST);
/**
 * @desc update  Milestone Task List
 */
export const updateMilestoneTaskList = createAction(Actions.UPDATE_MILETONE_TASK_LIST);
/**
 * @desc set  Milestone Task
 */
export const setMilestoneTask = createAction(Actions.SET_MILESTONE_TASK);
/**
 * @desc update  Milestone Task
 */
export const updateMilestoneTask = createAction(Actions.UPDATE_MILESTONE_TASK);
/**
 * @desc set children Milestone Task list
 */
export const setChildMilestoneTaskList = createAction(Actions.SET_CHILD_MILESTONE_TASK_LIST);
