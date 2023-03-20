import { Dimensions, Platform, StatusBar } from 'react-native';

export const DateFormat = 'YYYY-MM-DD';

export const WIN_WIDTH = Dimensions.get('window').width,
  WIN_HEIGHT = Dimensions.get('window').height;

export const isIOS = Platform.OS === 'ios' ? true : false;
export const isAndroid = Platform.OS === 'android' ? true : false;
export const isSmallDevice = WIN_HEIGHT <= 568 ? true : false;

export const IS_IPHONE_X = WIN_HEIGHT >= 812;
export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : StatusBar.currentHeight;

export const GCM_SENDER_ID = '146199492629';
export const appName = Platform.OS === 'android' ? 'AndroidApp' : 'iOSApp';

export const CONTENTFUL_SPACE_ID = 'r8pjr4ms79ww';
export const CONTENTFUL_ACCESS_TOKEN = 'br8YoYiSwdbx19mnQDFzDlkrKl35lVywUPapm6STmoM';
export const CONTENTFUL_PREVIEW_ACCESS_TOKEN = '7OInYtgTQrYPwx_W0WVDnnG-0eWWazdjfVCCRxjhvz4';

export const USERPROFILEPATH = 'userProfile';
export const CHILDPROFILEPATH = 'childProfile';
export const COMPLETEDACTIVITYIMAGEPATH = 'completedActivity';

export const THEME = 'theme';
export const SUBJECT = 'subject';

export const TODAY_ACTIVITY_LIST_SIZE = 8;
export const JUST_ADDED_ACTIVITY_LIST_SIZE = 8;

export const SPECIFIC_CHILD_ACTIVITY_LIST_SIZE = 6;
export const NO_OF_ACTIVITY_PER_PAGE = 50;
export const ARTICLE_TAG = {
  ALL: 'all',
};
export const TYPE_OF_ACTIVITY = {
  PRINTABLE_PDF: 'printable PDF',
  NO_PRINT: 'No-Print',
};

export const USER_PROFILE_FIELD = {
  FIRSTNAME: 'firstName',
  LASTNAME: 'lastName',
  EMAIL: 'email',
};
export const SORT_ACTIVITY_MENU = {
  MOSTRELEVANT: 'Most Relevant',
  NEWESTOOLDEST: 'Newest-Oldest',
  OLDESTONEWEST: 'Oldest-Newest',
  ASC: 'Alphabetical (A-Z)',
  DESC: 'Alphabetical (Z-A)',
};

export const MILESTONE_LIST = {
  birth: 'Birth',
  '2-months': '2 months',
  '4-months': '4 months',
  '6-months': '6 months',
  '9-months': '9 months',
  '12-months': '12 months',
  '15-months': '15 months',
  '18-months': '18 months',
  '2-years': '2 years',
  '2.5-years': '2.5 years',
  '3-years': '3 years',
  '4-years': '4 years',
  '5-years': '5 years',
};
