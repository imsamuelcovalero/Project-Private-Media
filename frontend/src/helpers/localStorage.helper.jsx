/* File: src/helpers/localStorage.helper.jsx */
export const getUserInfo = () => {
  const userInfo = localStorage.getItem('reactNodeUser');
  return userInfo ? JSON.parse(userInfo) : {};
};

export const saveUserInfo = (userInfo) => {
  localStorage.setItem('reactNodeUser', JSON.stringify(userInfo));
};

export const removeUserInfo = () => {
  localStorage.removeItem('reactNodeUser');
};

export const addMediaTimeToLocalStorage = (media) => {
  const userInfo = getUserInfo();
  const newUserInfo = {
    ...userInfo,
    mediaTime: {
      data: media.data,
      time: media.time,
    },
  };
  saveUserInfo(newUserInfo);
};

export const getMediaTime = () => {
  const userInfo = getUserInfo();
  return userInfo.mediaTime ? userInfo.mediaTime : null;
};
