/* File: src/helpers/localStorage.helper.jsx */

/* função que retorna o usuário armazenado no localStorage */
export const getUserInfo = () => {
  const userInfo = localStorage.getItem('reactNodeUser');
  return userInfo ? JSON.parse(userInfo) : null;
};

/* função que armazena o usuário no localStorage */
export const saveUserInfo = (userInfo) => {
  localStorage.setItem('reactNodeUser', JSON.stringify(userInfo));
};

/* função que remove o usuário do localStorage */
export const removeUserInfo = () => {
  localStorage.removeItem('reactNodeUser');
};

/*
*seção de funções para o Firebase
*/

/* função que armazena as mídias e o tempo no localStorage */
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

/* função que retorna as mídias e o tempo armazenados no localStorage */
export const getMediasTime = (categoryId, mediaType) => {
  const storedMediaDataRaw = localStorage.getItem('reactNodeMediaData');

  if (!storedMediaDataRaw) return null;

  const storedMediaData = JSON.parse(storedMediaDataRaw);

  return storedMediaData[categoryId] && storedMediaData[categoryId][mediaType]
    ? storedMediaData[categoryId][mediaType]
    : null;
};

/* função que armazena os últimos documentos de fotos e vídeos no localStorage */
export const storeLastMediaDocs = (categoryId, mediaType, lastDoc) => {
  const storedLastDocs = localStorage.getItem('reactNodeLastMediaDocs')
    ? JSON.parse(localStorage.getItem('reactNodeLastMediaDocs'))
    : {};

  if (!storedLastDocs[categoryId]) {
    storedLastDocs[categoryId] = {};
  }

  storedLastDocs[categoryId][mediaType] = lastDoc;

  localStorage.setItem('reactNodeLastMediaDocs', JSON.stringify(storedLastDocs));
};

/* função que retorna os últimos documentos de fotos e vídeos do localStorage */
export const getLastMediaDocs = (categoryId, mediaType) => {
  const storedLastDocsRaw = localStorage.getItem('reactNodeLastMediaDocs');

  if (!storedLastDocsRaw) return null;

  const storedLastDocs = JSON.parse(storedLastDocsRaw);

  return storedLastDocs[categoryId] && storedLastDocs[categoryId][mediaType]
    ? storedLastDocs[categoryId][mediaType]
    : null;
};

/*
*Seção de funções para o Mercado Pago
*/

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
