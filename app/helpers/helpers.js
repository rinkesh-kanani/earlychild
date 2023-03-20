import moment from 'moment';
// eslint-disable-next-line react-native/split-platform-components
import { ToastAndroid, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { getRandomNumber } from './RandomeNumberHelper';
import auth from '@react-native-firebase/auth';

/**
 * @desc Checks for valid email
 * @param {*} value // Accepts string
 */
export function isEmail(value) {
  var myRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks for Empty string
 * @param {*} value // Accepts string, object
 */
export function isEmpty(value) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
export function isNumber(value) {
  var myRegEx = /^(\s*[0-9]+\s*)+$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc: Check valid date
 */
export function isValidDate(d) {
  return d instanceof Date;
}

export function getDate(date) {
  if (!date) date = new Date();
  else date = new Date(date);

  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

/**
 * @desc Change Display Format based on date
 * @param {*} date
 */
export function __displayDate(date) {
  if (!date) return date;

  const today = getDate();
  const yesterday = getDate();
  yesterday.setDate(yesterday.getDate() - 1);

  let diff = moment(today).diff(date, 'days');

  if (diff == 0) {
    return 'Today';
  } else if (diff == 1) {
    return `Yesterday`;
  } else {
    return moment(date).format('dddd, MMM Do');
  }
}

export function formatCurrency(num, decimals = 4) {
  try {
    var formatter = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    const roundedNumber = mathRound(num, decimals);
    const result = formatter.format(roundedNumber);
    return result;
  } catch (e) {
    console.log('ERROR', e);
  }
  return num;
}
export function mathRound(number, digit = 2) {
  try {
    // if (Number(number) < 1) digit = 3;
    if (number) return Number(number).toFixed(digit);
  } catch (e) {
    //TODO:
  }
  return Number(0).toFixed(2);
}

export function currencyWithDecimal(num) {
  let returnValue = num;
  try {
    let digit = 2;
    if (num) {
      if (!isNaN(Number(num))) {
        if (Number(num) < 1) digit = 3;
        if (Number(num) > 999) digit = 1;
        const num2 = Number(num).toFixed(digit);
        returnValue = formatCurrency(num2);
      }
    } else {
      returnValue = Number(0).toFixed(digit);
    }
  } catch (e) {
    //TODO:
  }
  return returnValue;
}

export function toTitleCase(str) {
  if (!str) return str;

  str = str.trim();
  if (str.length == 0) return str;

  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function toSentenseCase(str) {
  if (!str) return str;

  str = str.trim();
  if (str.length == 0) return str;

  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

export function getAPIErrorReason(e) {
  if (e) {
    if (e.response && e.response.data) return e.response.data.reason || e.response.data.message;
    else if (e.message) return e.message;
  }
  return;
}

export function toastNotification(message) {
  if (Platform.OS == 'ios') {
    alert(message);
  } else {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
}

//Get file Name
export const getFileName = (path) => {
  let split = path.split('/');
  if (split && split.length > 0) {
    return split[split.length - 1];
  }
  return;
};

export const convertSecondsToRelativeTime = (s) => {
  var fm = [
    { value: Math.floor(s / 31556952), unit: 'year' },
    { value: Math.floor(s / 2629746), unit: 'month' },
    { value: Math.floor(s / (3600 * 24)), unit: 'day' },
    { value: Math.floor((s % (3600 * 24)) / 3600), unit: 'hour' },
    { value: Math.floor((s % 3600) / 60), unit: 'minute' },
    { value: Math.floor(s % 60), unit: 'second' },
  ];
  fm.map((v) => {
    v.time = plural(v.value, v.unit);
  });
  const item = fm.find((v) => !!v.time);
  if (item) return item.time;
};

const plural = (value, unit) => {
  if (value === 1) {
    return value + ' ' + unit;
  } else if (value > 1) {
    return value + ' ' + unit + 's';
  }
};

export const validFirebaseErrorMessage = (e) => {
  if (!e) return;
  const code = JSON.parse(JSON.stringify(e.code));
  let message = '';
  switch (code) {
    case 'auth/invalid-phone-number':
      message = 'Please enter a valid number';
      break;
    case 'auth/invalid-verification-code':
      message = 'Invalid verification code';
      break;
    case 'auth/too-many-requests':
      message = 'You have attempt too many rerequests. Please try again later.';
      break;
    case 'auth/invalid-email':
      message = 'Please enter a valid email';
      break;
    case 'auth/user-not-found':
      message = 'Please enter valid email or password';
      break;
    case 'auth/wrong-password':
      message = 'Please enter valid email or password';
      break;
    case 'auth/email-already-in-use':
      message = 'That email address is already in use!';
      break;
    default:
      message = JSON.stringify(e.message);
      break;
  }
  console.log('message', message);

  toastNotification(message);
};

/**

 * @desc it return unique GUID string

 */

export const getUniqueId = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
};

export const openFilePicker = async (isMultiple = false, isCrop = true) => {
  try {
    let img;
    await ImagePicker.openPicker({
      width: 560,
      height: 560,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      compressImageQuality: 0.8,
      cropping: isCrop,
      multiple: isMultiple, //if you make it true then able to pick
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(async (image) => {
        img = image;
      })
      .catch((e) => {
        let permissionMsg =
          Platform.OS === 'ios'
            ? 'Cannot access images. Please allow access if you want to be able to select images.'
            : 'Required permission missing';
        if (e.message === 'Cannot find image data') {
          toastNotification('Unsupportable image');
        } else if (e.message === permissionMsg) {
          toastNotification(
            'You need to grant permission to access photos in order to complete this operation. Please enable it from Settings',
          );
        } else {
          console.log('e', e);
        }
      });
    return img;
  } catch (err) {
    console.log('err', err);
  }
};

export const subtractWeeks = (numOfWeeks, date = new Date()) => {
  date.setDate(date.getDate() - numOfWeeks * 7);

  return date;
};

export const caclulateMilestoneMonths = (birthday, premature) => {
  const date = new Date();
  const birthDate = subtractWeeks(premature ?? 0, new Date(birthday));

  const months =
    date.getUTCMonth() - birthDate.getUTCMonth() + 12 * (date.getUTCFullYear() - birthDate.getUTCFullYear());
  return months;
};

export const calculateMilestone = (birthday, premature) => {
  const months = caclulateMilestoneMonths(birthday, premature);

  if (months < 2) return 'birth';
  else if (months >= 2 && months < 4) return '2-months';
  else if (months >= 4 && months < 6) return '4-months';
  else if (months >= 6 && months < 9) return '6-months';
  else if (months >= 9 && months < 12) return '9-months';
  else if (months >= 12 && months < 15) return '12-months';
  else if (months >= 15 && months < 18) return '15-months';
  else if (months >= 18 && months < 24) return '18-months';
  else if (months >= 24 && months < 30) return '2-years';
  else if (months >= 30 && months < 36) return '2.5-years';
  else if (months >= 36 && months < 48) return '3-years';
  else if (months >= 48 && months < 60) return '4-years';
  else if (months >= 60) return '5-years';
};

export const calculateAge = (birthday) => {
  const date = new Date();
  const birthDate = new Date(birthday);
  const months = date.getMonth() - birthDate.getMonth() + 12 * (date.getFullYear() - birthDate.getFullYear());
  if (months < 36) return `${months} months`;
  else if (months >= 36 && months < 42) return '3 years';
  else if (months >= 42 && months < 48) return '3.5 years';
  else return `${Math.floor(months / 12)} years`;
};

export const calculateMilestoneAge = (birthday, premature) => {
  const months = caclulateMilestoneMonths(birthday, premature);
  return Math.floor(months / 12);
};

/**
 * get random number
 */

export const getRandomIndex = (listSize, noOfActivity, extraDate) => {
  const date = moment().format('DDMMYYYY').concat(moment(extraDate).format('DDMMYYYY'));

  let list = [];
  var rng = new getRandomNumber(parseInt(date));
  while (list?.length !== noOfActivity) {
    const randomnumber = rng.nextRange(0, listSize);
    const index = list.findIndex((x) => x === randomnumber);
    if (index === -1) list.push(randomnumber);
  }

  return list;
};

export const currentStreak = (list) => {
  let thisMonthCount = 0;
  let allTimeCount = 0;
  let todayInStreak = true;

  const currentMonth = new Date().getUTCMonth();
  if (!isToday(list?.[0])) {
    todayInStreak = false;
  }

  list.forEach((item, index) => {
    const dateDiff = getDateDifference(dateToYMD(new Date(item)), dateToYMD(new Date()));
    if (dateDiff === (todayInStreak ? index : index + 1)) {
      if (currentMonth === new Date(item).getUTCMonth()) thisMonthCount++;
      allTimeCount++;
    } else return;
  });
  return { thisMonth: thisMonthCount, allTime: allTimeCount };
};

export const reauthenticate = (currentPassword) => {
  var user = auth().currentUser;
  var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
  return auth().currentUser.reauthenticateWithCredential(cred);
};

export const dateToYMD = (date) => {
  if (!date) return;
  var d = date.getUTCDate();
  var m = date.getUTCMonth() + 1; //Month from 0 to 11
  var y = date.getUTCFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
};

export const getDateDifference = (startDate, endDate) => {
  try {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (error) {
    console.log('getDateDifference error', error);
  }
};

export const isToday = (date) => {
  const today = dateToYMD(new Date());
  const formattedDate = dateToYMD(new Date(date));
  const diff = getDateDifference(formattedDate, today);
  return diff === 0;
};
