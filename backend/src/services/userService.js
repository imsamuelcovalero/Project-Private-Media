// File: userService.js em backend/src/services
const admin = require('firebase-admin');
const boom = require('@hapi/boom');

const getUserByToken = async (idToken) => {
  // console.log('idToken2', idToken);
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('decodedIdToken', decodedIdToken);
    return decodedIdToken;
  } catch (error) {
    throw boom.internal('Erro ao validar o ID token', error);
  }
};

const getUserFromFirestore = async (uid) => {
  try {
    const usersCollection = admin.firestore().collection('usuários');
    const snapshot = await usersCollection.where('uid', '==', uid).get();

    if (snapshot.empty) {
      console.log('No such document!');
      return null;
    } else {
      let user = null;
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        user = doc.data();
      });
      return user;
    }
  } catch (error) {
    console.log('Error getting document', error);
    throw error;
  }
};

const checkSubscription = async (assinaturaAtiva, dataExpiracaoAssinatura) => {
  if (!assinaturaAtiva) {
    throw boom.paymentRequired('Assinatura inativa. Por favor, assine para continuar usando o serviço.');
  }
  
  const currentDate = new Date();
  const subscriptionExpiryDate = new Date(dataExpiracaoAssinatura);

  if (currentDate >= subscriptionExpiryDate) {
    throw boom.paymentRequired('Assinatura expirada. Por favor, renove sua assinatura para continuar usando o serviço.');
  }
};

const login = async (userData) => {
  const { idToken } = userData;
  // console.log('idToken', idToken);

  const decodedIdToken = await getUserByToken(idToken);
  // console.log('decodedIdToken', decodedIdToken.uid);

  const user = await getUserFromFirestore(decodedIdToken.uid);
  // console.log('user', user);

  if (!user) throw boom.notFound('Usuário não encontrado');

  await checkSubscription(user.assinaturaAtiva, user.dataExpiracaoAssinatura);

  const result = { token: idToken, id: user.uid, email: user.email, nome: user.nome, assinaturaAtiva: user.assinaturaAtiva };
  // console.log('result', result);
  return result;
};

// função responsável por criar um novo usuário no banco de dados
const createNewUser = async (userData) => {
  const { idToken } = userData;
  // console.log('idToken', idToken);

  const decodedIdToken = await getUserByToken(idToken);
  // console.log('decodedIdToken', decodedIdToken.uid);

  const user = await getUserFromFirestore(decodedIdToken.uid);
  console.log('user', user);

  const result = { token: idToken, id: user.uid, email: user.email, nome: user.nome, assinaturaAtiva: user.assinaturaAtiva };
  // console.log('result', result);
  return result;
};

const verifyUser = async (userId) => {
  const user = await getUserFromFirestore(userId);
  // console.log('user', user);

  if (!user) throw boom.notFound('Usuário não encontrado');

  return { assinaturaAtiva: user.assinaturaAtiva };
};

module.exports = {
  login,
  createNewUser,
  verifyUser,
};
