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
  const mediaTime = {
    data: media.data,
    time: media.time,
  };
  localStorage.setItem('reactNodeMediaTime', JSON.stringify(mediaTime));
};

export const getMediaTime = () => {
  const mediaTime = localStorage.getItem('reactNodeMediaTime');
  return mediaTime ? JSON.parse(mediaTime) : null;
};

/* função que armazena o PaymentId no localStorage */
export const addPaymentIdToLocalStorage = (PaymentId) => {
  localStorage.setItem('reactNodePaymentId', JSON.stringify(PaymentId));
};

/* função que retorna o PaymentId armazenado no localStorage */
export const getPaymentIdFromLocalStorage = () => {
  const PaymentId = localStorage.getItem('reactNodePaymentId');
  return PaymentId ? JSON.parse(PaymentId) : null;
};

/* função que remove o PaymentId do localStorage */
export const removePaymentIdFromLocalStorage = () => {
  localStorage.removeItem('reactNodePaymentId');
};
