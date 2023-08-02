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
