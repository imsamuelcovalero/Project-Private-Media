// File: userService.js em backend/src/services
const admin = require('firebase-admin');
const boom = require('@hapi/boom');
const { th } = require('date-fns/locale');

/* função responsável por verificar o token do usuário */
const getUserByToken = async (idToken) => {
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);

    return decodedIdToken;
  } catch (error) {
    throw boom.internal('Erro ao validar o ID token', error);
  }
};

/* função responsável por buscar o usuário no banco de dados */
const getUserFromFirestore = async (uid) => {
  try {
    const usersCollection = admin.firestore().collection('usuários');
    const snapshot = await usersCollection.where('uid', '==', uid).get();

    if (snapshot.empty) {
      throw boom.notFound(`Documento não encontrado para o UID: ${uid}`);
    } else {
      let user = null;
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        user = doc.data();
      });
      return user;
    }
  } catch (error) {
    throw boom.internal('Erro ao buscar o usuário no banco de dados', error);
  }
};

/* função responsável por atualizar o status da assinatura do usuário */
const updateSubscriptionStatus = async (uid, status) => {
  const usersCollection = admin.firestore().collection('usuários');
  
  // Buscar o documento com base no uid
  const querySnapshot = await usersCollection.where('uid', '==', uid).get();
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    await doc.ref.update({ assinaturaAtiva: status });
  } else {
    throw boom.notFound(`Documento não encontrado para o UID: ${uid}`);
  }
};

/* função responsável por verificar se a assinatura do usuário está ativa ou não */
const checkSubscription = async (assinaturaAtiva, dataExpiracaoAssinatura, uid) => {  
  if (!assinaturaAtiva) {
    return 'Assinatura inativa. Por favor, assine para usar o serviço.';
  }
  
  const currentDate = new Date();
  const subscriptionExpiryDate = new Date(dataExpiracaoAssinatura._seconds * 1000);
  
  if (currentDate >= subscriptionExpiryDate) {
    // Atualiza o valor de assinaturaAtiva para false
    await updateSubscriptionStatus(uid, false);

    return 'Assinatura expirada. Por favor, renove sua assinatura para continuar usando o serviço.';
  }

  return 'OK';
};

/* função responsável por fazer o login do usuário */
const login = async (userData) => {
  const { idToken } = userData;

  const decodedIdToken = await getUserByToken(idToken);

  const user = await getUserFromFirestore(decodedIdToken.uid);

  if (!user) throw boom.notFound('Usuário não encontrado');

  const check = await checkSubscription(user.assinaturaAtiva, user.dataExpiracaoAssinatura, user.uid);

  const result = { token: idToken, id: user.uid, email: user.email, nome: user.nome, assinaturaAtiva: {
    status: user.assinaturaAtiva,
    message: check,
  } };

  return result;
};

/* função responsável por criar ou atualizar um usuário no banco de dados */
const createAndUpdateUser = async (userData) => {
  const { idToken } = userData;

  const decodedIdToken = await getUserByToken(idToken);

  const user = await getUserFromFirestore(decodedIdToken.uid);

  const result = { token: idToken, id: user.uid, email: user.email, nome: user.nome, assinaturaAtiva: {
    status: user.assinaturaAtiva,
  } };

  return result;
};

/* função responsável por verificar o usuário o status da assinatura */
const verifyUser = async (userId) => {
  const user = await getUserFromFirestore(userId);

  if (!user) throw boom.notFound('Usuário não encontrado');

  const check = await checkSubscription(user.assinaturaAtiva, user.dataExpiracaoAssinatura, user.uid);

  return { id: user.uid, email: user.email, nome: user.nome, assinaturaAtiva: {
    status: user.assinaturaAtiva,
    message: check,
  } };
};

module.exports = {
  login,
  createAndUpdateUser,
  verifyUser,
};
