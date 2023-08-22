/* File: src/helpers/localStorage.helper.jsx */
export const getUserInfo = () => {
  const userInfo = localStorage.getItem('reactNodeUser');
  return userInfo ? JSON.parse(userInfo) : null;
};

export const saveUserInfo = (userInfo) => {
  localStorage.setItem('reactNodeUser', JSON.stringify(userInfo));
};

export const removeUserInfo = () => {
  localStorage.removeItem('reactNodeUser');
};

// Armazena as mídias e o tempo no localStorage
export const addMediasTimeToLocalStorage = (categoryId, mediaType, medias) => {
  const storedMediaData = localStorage.getItem('reactNodeMediaData')
    ? JSON.parse(localStorage.getItem('reactNodeMediaData'))
    : {};

  if (!storedMediaData[categoryId]) {
    storedMediaData[categoryId] = {};
  }

  storedMediaData[categoryId][mediaType] = {
    data: medias,
    time: Date.now(),
  };

  localStorage.setItem('reactNodeMediaData', JSON.stringify(storedMediaData));
};

// Pega as mídias e o tempo do localStorage para uma determinada categoria e tipo
export const getMediasTime = (categoryId, mediaType) => {
  const storedMediaDataRaw = localStorage.getItem('reactNodeMediaData');

  if (!storedMediaDataRaw) return null;

  const storedMediaData = JSON.parse(storedMediaDataRaw); // Parse the JSON string

  return storedMediaData[categoryId] && storedMediaData[categoryId][mediaType]
    ? storedMediaData[categoryId][mediaType]
    : null;
};

// export const addMediaTimeToLocalStorage = (media) => {
//   const mediaTime = {
//     data: media.data,
//     time: media.time,
//   };
//   localStorage.setItem('reactNodeMediaTime', JSON.stringify(mediaTime));
// };

// export const getMediaTime = () => {
//   const mediaTime = localStorage.getItem('reactNodeMediaTime');
//   return mediaTime ? JSON.parse(mediaTime) : null;
// };

/* função que armazena o PaymentId no localStorage */
export const addPaymentId = (PaymentId) => {
  localStorage.setItem('reactNodePaymentId', JSON.stringify(PaymentId));
};

/* função que retorna o PaymentId armazenado no localStorage */
export const getPaymentId = () => {
  const PaymentId = localStorage.getItem('reactNodePaymentId');
  return PaymentId ? JSON.parse(PaymentId) : null;
};

/* função que remove o PaymentId do localStorage */
export const removePaymentId = () => {
  localStorage.removeItem('reactNodePaymentId');
};
