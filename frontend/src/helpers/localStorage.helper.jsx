/* File: src/helpers/localStorage.helper.jsx */
export const getUserInfo = () => {
  const userInfo = localStorage.getItem('reactNode');
  return userInfo ? JSON.parse(userInfo) : {};
};

export const saveUserInfo = (userInfo) => {
  localStorage.setItem('reactNode', JSON.stringify(userInfo));
};
