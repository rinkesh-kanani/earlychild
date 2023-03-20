import localStorage, { getAuthUser } from './localStorage';

export const setupToken = async () => {
  const authData = await getAuthUser();
  if (authData) {
      return authData?.token;
  }
  return false; // if no token or expired token, return false
};

export const clearLocalData = async () => {
  await localStorage.deleteAllLocalData();
};
