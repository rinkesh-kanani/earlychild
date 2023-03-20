import { combineReducers } from 'redux';
import appReducer from './appReducer';
import authReducers from './authReducer';
import articleReducer from './articleReducer';
import activityReducer from './activityReducer';
import subjectReducer from './subjectReducer';
import themeReducer from './themeReducer';
import ageReducer from './ageReducer';
import milestoneReducer from './milestoneReducer';
import userReducers from './userReducer';
import childReducers from './childReducer';
import completedActivityReducers from './completedActivityReducer';
import MindfulPlaytimeReducer from './MindfulPlaytimeReducer';
import quoteReducer from './quoteReducer';
import favoriteActivityReducers from './favoriteActivityreducer';
export default combineReducers({
  app: appReducer,
  auth: authReducers,
  article: articleReducer,
  activity: activityReducer,
  subject: subjectReducer,
  theme: themeReducer,
  age: ageReducer,
  milestone: milestoneReducer,
  user: userReducers,
  child: childReducers,
  completedActivity: completedActivityReducers,
  mindfulPlaytime: MindfulPlaytimeReducer,
  quote: quoteReducer,
  favoriteActivity: favoriteActivityReducers,
});
