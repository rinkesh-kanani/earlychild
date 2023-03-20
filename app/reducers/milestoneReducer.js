import { createReducer as createReducerOrig, current } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import * as Actions from '../actions/types';
import { createReducer } from '../helpers/reduxHelpers';

const loadingReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_MILESTONE_TASK_LOADER,
});

const currentMilestoneReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CURRENT_MILESTONE,
});

const childMilestoneListReducer = createReducer({
  initialState: [],
  actionType: Actions.SET_CHILD_MILESTONE_TASK_LIST,
});

const milestoneListReducer = createReducer({
  initialState: [],
  actionType: Actions.SET_MILESTONE_LIST,
});

const initialState = [];
const milestoneTaskListReducer = createReducerOrig(initialState, (builder) => {
  builder
    .addCase(Actions.SET_MILESTONE_TASK_LIST, (state = initialState, action) => {
      return [...(action.payload || [])];
    })
    .addCase(Actions.UPDATE_MILETONE_TASK_LIST, (state = initialState, action) => {
      const milestoneList = current(state);
      let list = JSON.parse(JSON.stringify(milestoneList));
      const milestoneTaskindex = list?.findIndex((s) => s?.slug === action.payload.slug);
      list[milestoneTaskindex] = action.payload.item;
      return list;
    });
});

const initialMilestoneTaskSate = {};
const milestoneTaskReducer = createReducerOrig(initialMilestoneTaskSate, (builder) => {
  builder
    .addCase(Actions.SET_MILESTONE_TASK, (state = initialMilestoneTaskSate, action) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.UPDATE_MILESTONE_TASK, (state, action) => {
      const info = { ...state };
      info[action.payload.propsName] = action.payload.value;
      return { ...info };
    });
});

// const initialMilestoneList=[]
// // const milestoneListReducer =createReducerOrig(initialMilestoneList,(builder)=>{
// //   builder
// //   .add
// // })
export default combineReducers({
  currentMilestone: currentMilestoneReducer,
  milestoneTaskList: milestoneTaskListReducer,
  milestoneTask: milestoneTaskReducer,
  loading: loadingReducer,
  childMilestoneList: childMilestoneListReducer,
  milestoneList: milestoneListReducer,
});
