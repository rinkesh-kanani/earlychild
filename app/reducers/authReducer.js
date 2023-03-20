import * as Actions from '../actions/types';
import { combineReducers } from 'redux';
import { createReducer } from '../helpers/reduxHelpers';
import { createReducer as createReducerOrig } from '@reduxjs/toolkit';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_AUTH_LOADER,
});

const initialState = {
  phone: '',
  country: {
    country_id: '101',
    country_name: 'India',
    country_code: 'IN',
    country_phone_code: '91',
    timezones:
      '[{"zoneName":"Asia\\/Kolkata","gmtOffset":19800,"gmtOffsetName":"UTC+05:30","abbreviation":"IST","tzName":"Indian Standard Time"}]',
    shortcode: 'IND',
    flag: 'https://gs.dreamchild.app/assets/images/h20/in.png',
  },
};
const loginUserReducer = createReducerOrig(initialState, (builder) => {
  builder
    .addCase(Actions.UPDATE_LOGIN_USER, (state, action) => {
      const info = { ...state };
      info[action.payload.propsName] = action.payload.value;
      return { ...info };
    })
    .addCase(Actions.CLEAR_LOGIN_USER, () => {
      const initialInfoState = JSON.parse(JSON.stringify(initialState));
      return initialInfoState;
    });
});

const signInInitialState = {
  email: '',
  password: '',
};

const signinUserReducer = createReducerOrig(signInInitialState, (builder) => {
  builder
    .addCase(Actions.UPDATE_SIGNIN_USER, (state, action) => {
      const info = { ...state };
      info[action.payload.propsName] = action.payload.value;
      return { ...info };
    })
    .addCase(Actions.CLEAR_SIGNIN_USER, () => {
      const initialInfoState = JSON.parse(JSON.stringify(signInInitialState));
      return initialInfoState;
    });
});

const signupInitialState = {
  email: '',
  password: '',
  confirmPassword: '',
};

const signupUserReducer = createReducerOrig(signupInitialState, (builder) => {
  builder
    .addCase(Actions.UPDATE_SIGNUP_USER, (state, action) => {
      const info = { ...state };
      info[action.payload.propsName] = action.payload.value;
      return { ...info };
    })
    .addCase(Actions.CLEAR_SIGNUP_USER, () => {
      const initialInfoState = JSON.parse(JSON.stringify(signInInitialState));
      return initialInfoState;
    });
});

const onBoardingInitialState = {
  id: '',
  uid: '',
  firstName: '',
  lastName: '',
  userProfile: '',
  userProfileLink: '',
  child: [],
};

const onBoardingReducer = createReducerOrig(onBoardingInitialState, (builder) => {
  builder
    .addCase(Actions.UPDATE_ONBOARDING_USER, (state, action) => {
      const info = { ...state };
      info[action.payload.propsName] = action.payload.value;
      return { ...info };
    })
    .addCase(Actions.CLEAR_ONBOARDING_USER, () => {
      const initialInfoState = JSON.parse(JSON.stringify(signInInitialState));
      return initialInfoState;
    });
});

const childInitialState = {
  profile: '',
  profileLink: '',
  firstName: '',
  lastName: '',
  birthDay: new Date(),
  premature: false,
  noOfWeekPremature: '',
};

const childItemReducer = createReducerOrig(childInitialState, (builder) => {
  builder
    .addCase(Actions.SET_CHILD_ITEM, (state = childInitialState, action) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.UPDATE_CHILD_ITEM, (state, action) => {
      const info = { ...state };
      info[action.payload.propsName] = action.payload.value;
      return { ...info };
    })
    .addCase(Actions.CLEAR_CHILD_ITEM, () => {
      const initialInfoState = JSON.parse(JSON.stringify(childInitialState));
      return initialInfoState;
    });
});

const authReducers = combineReducers({
  loading: loadingReducer,
  loginUser: loginUserReducer,
  signinUser: signinUserReducer,
  signupUser: signupUserReducer,
  onBoarding: onBoardingReducer,
  child: childItemReducer,
});

export default authReducers;
