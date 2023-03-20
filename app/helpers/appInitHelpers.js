import auth from '@react-native-firebase/auth';
import _ from 'lodash';
import { getAllActivity } from '../services/activityservice';
import { setAllChildDocuments, setCurrentChildData } from '../services/childService';
import { getAllCompletedActivityDocuments } from '../services/completedActivityService';
import { getAllFavoriteActivityDocuments } from '../services/favoriteActivityservice';
import { getAllMilestone } from '../services/milestoneservice';
import { getMindfulPlaytimeAllDocument } from '../services/mindfulPlayTimeService';
import { getUserDocId, setCurrentUser } from '../services/userService';
import { saveAuthUser } from '../utils/localStorage';
import asyncStorageHelpers from './asyncStorageHelpers';

export const appInit = () => async (dispatch) => {
  // debug('initializing push notifications');
  // initPushNotifications();

  const user = auth().currentUser;
  if (user && !_.isNull(user)) await user.reload();
  if (user) {
    const userId = user?.uid;
    const userDocId = await dispatch(getUserDocId(userId));
    await dispatch(setCurrentUser(userId, userDocId));
    // await dispatch(setAllChildDocuments());
    const childList = await dispatch(setAllChildDocuments());
    const child = await asyncStorageHelpers.getCurrentChild();
    let currentChild = childList?.[0];
    if (child) {
      currentChild = child;
    }
    dispatch(setCurrentChildData(currentChild));
    await dispatch(getAllActivity());
    await dispatch(getAllCompletedActivityDocuments());
    await dispatch(getMindfulPlaytimeAllDocument());
    // await dispatch(getAllFavoriteActivityDocuments());
    await dispatch(getAllMilestone());
  }
  auth().onIdTokenChanged(async (userDetails) => {
    if (userDetails && !_.isNull(userDetails)) {
      const user = auth().currentUser;
      const token = await user.getIdToken();
      const data = {
        ...user._user,
        token,
      };
      await saveAuthUser(data);
      // store.dispatch(setToken(token));
      // store.dispatch(setUser(user));
    }
  });

  auth().onAuthStateChanged(async (userDetails) => {
    if (userDetails && !_.isNull(userDetails)) {
      const user = auth().currentUser;
      const token = await user.getIdToken();
      user.token = token;
      const data = {
        ...user._user,
        token,
      };
      await saveAuthUser(data);
      // await saveAuthUser(user);
      // store.dispatch(setToken(token));
      // store.dispatch(setUser(user));
      // await asyncStorageHelpers.setAuthToken(token);
    } else {
      // store.dispatch(setToken(null));
      // store.dispatch(setUser(null));
      // await store.dispatch(clearDataOnLogout());
    }
  });
};
