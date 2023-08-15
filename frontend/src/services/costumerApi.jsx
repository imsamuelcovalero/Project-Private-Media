/*
    ** Costumer functions ** in src/services/costumerApi.jsx
*/
import api from './axios';

async function handleRequest(requestFunc, errorMessage) {
  try {
    const result = await requestFunc();

    if (![200, 201].includes(result.status)) {
      console.log('result.status', result.status);
      throw new Error(`HTTP error! Status: ${result.status}`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
    const outPutErrorMessage = error.response?.data?.message || error.response?.statusText
    || errorMessage;
    throw new Error(outPutErrorMessage);
  }
}

/* função axios que envia o token para o backend para validar o usuário */
async function checkToken() {
  return handleRequest(() => api.get('/login/me'), 'Authentication error');
}

/* função axios de login que envia o idToken para o backend e recebe as informações
do usuário em caso de sucesso */
async function signIn(idToken) {
  return handleRequest(() => api.post('/login', { idToken }), 'Authentication error');
}

/* função axios para fazer logout */
async function logout() {
  return handleRequest(() => api.get('/logout'), 'Error during logout');
}

/* Função axios de registro que envia o idToken para o backend e recebe as informações
do usuário em caso de sucesso */
async function signUp(idToken) {
  return handleRequest(() => api.post('/register', { idToken }), 'Registration error');
}

/* Função axios de atualização de perfil que envia o idToken para o backend e recebe
as informações do usuário em caso de sucesso */
async function updateProfile(idToken) {
  return handleRequest(() => api.post('/update', { idToken }), 'Update error');
}

/* função axios que envia para o backend as informações do pagamento para serem processadas */
async function processPayment(paymentDetails) {
  return handleRequest(() => api.post('/process_payment', paymentDetails), 'Payment error');
}

/* função axios que envia para o backend userId e PaymentId para serem processados */
async function processPaymentStatus(userId, PaymentId) {
  return handleRequest(
    () => api.post('/process_payment_status', { userId, PaymentId }),
    'Payment status error',
  );
}

export {
  checkToken,
  signIn,
  logout,
  signUp,
  updateProfile,
  processPayment,
  processPaymentStatus,
};
