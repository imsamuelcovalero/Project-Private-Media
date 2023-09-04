/* File: src/helpers/localStorage.helper.jsx */

// Função auxiliar para obter o tamanho do uso atual do localStorage
const getLocalStorageUsage = () => {
  const allData = JSON.stringify(localStorage);
  // Convertendo tamanho de bytes para MBs e retornando
  return allData ? (allData.length * 16) / (8 * 1024 * 1024) : 0;
};

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
  try {
    // Verifica o uso atual
    const usage = getLocalStorageUsage();
    if (usage > 4.5) console.warn('o localStorage está quase cheio, considere limpar alguns dados');

    const storedMediaData = JSON.parse(localStorage.getItem('reactNodeMediaData') || '{}');

    if (!storedMediaData[categoryId]) {
      storedMediaData[categoryId] = {};
    }

    storedMediaData[categoryId][mediaType] = {
      data: medias,
      time: Date.now(),
    };
    console.log('storedMediaData', storedMediaData);

    localStorage.setItem('reactNodeMediaData', JSON.stringify(storedMediaData));

    return { status: 'SUCCESS', message: 'Data successfully saved to localStorage.' };
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return { errorCode: 'SAVE_ERROR', message: 'Error saving to localStorage.' };
  }
};

/* função que retorna as mídias e o tempo armazenados no localStorage */
export const getMediasTime = (categoryId, mediaType) => {
  const storedMediaDataRaw = localStorage.getItem('reactNodeMediaData');
  console.log('storedMediaDataRaw', storedMediaDataRaw);

  if (!storedMediaDataRaw) return null;

  try {
    const storedMediaData = JSON.parse(storedMediaDataRaw);

    return storedMediaData[categoryId] && storedMediaData[categoryId][mediaType]
      ? storedMediaData[categoryId][mediaType]
      : null;
  } catch (error) {
    console.error('Error parsing data from localStorage:', error);
    return { errorCode: 'PARSE_ERROR', message: 'Error parsing data from localStorage.' };
  }
};

/* função que armazena os últimos documentos de fotos e vídeos no localStorage */
export const storeLastMediaDocs = (categoryId, mediaType, lastDoc) => {
  try {
    const storedLastDocs = localStorage.getItem('reactNodeLastMediaDocs')
      ? JSON.parse(localStorage.getItem('reactNodeLastMediaDocs'))
      : {};

    if (!storedLastDocs[categoryId]) {
      storedLastDocs[categoryId] = {};
    }

    storedLastDocs[categoryId][mediaType] = lastDoc;

    localStorage.setItem('reactNodeLastMediaDocs', JSON.stringify(storedLastDocs));

    return { status: 'SUCCESS', message: 'Last document successfully saved to localStorage.' };
  } catch (error) {
    console.error('Error saving last document to localStorage:', error);
    return { errorCode: 'DOC_SAVE_ERROR', message: 'Error saving last document to localStorage.' };
  }
};

/* função que retorna os últimos documentos de fotos e vídeos do localStorage */
export const getLastMediaDocs = (categoryId, mediaType) => {
  try {
    const storedLastDocsRaw = localStorage.getItem('reactNodeLastMediaDocs');

    if (!storedLastDocsRaw) return null;

    const storedLastDocs = JSON.parse(storedLastDocsRaw);

    return storedLastDocs[categoryId] && storedLastDocs[categoryId][mediaType]
      ? storedLastDocs[categoryId][mediaType]
      : null;
  } catch (error) {
    console.error('Error retrieving last document from localStorage:', error);
    return { errorCode: 'DOC_RETRIEVAL_ERROR', message: 'Error retrieving last document from localStorage.' };
  }
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
