/*
    ** Costumer functions ** in src/services/costumerApi.jsx
*/
import api from './axios';

/* função axios que envia o token para o backend para validar o usuário */
async function checkToken() {
  try {
    const result = await api.get('/login/me');
    if (result.status !== 200) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
    throw new Error('Authentication error');
  }
}

/* função axios que envia o idToken para o backend e recebe as informações do usuário
em caso de sucesso */
async function signIn(idToken) {
  try {
    const result = await api.post('/login', { idToken });
    console.log('result', result);

    if (result.status !== 200) {
      console.log('result.status', result.status);
      throw new Error(`HTTP error! Status: ${result.status}`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
    throw new Error('Authentication error');
  }
}

/* função axios para fazer logout */
async function logout() {
  try {
    const result = await api.get('/logout');

    if (result.status !== 200) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error during logout');
  }
}

/* Função axios que envia o idToken para o backend e recebe as informações do usuário
em caso de sucesso */
async function signUp(idToken) {
  try {
    const result = await api.post('/register', { idToken });

    if (result.status !== 200) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
    throw new Error('Registration error');
  }
}

export {
  checkToken,
  signIn,
  logout,
  signUp,
};
