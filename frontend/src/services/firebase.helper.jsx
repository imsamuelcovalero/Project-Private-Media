/* File: src/services/firebase.helper.jsx */
import {
  signInWithEmailAndPassword, getIdToken, createUserWithEmailAndPassword,
  updateProfile, updatePassword,
} from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

/* Função que faz o login no firebase e retorna o idToken */
const firebaseSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await getIdToken(userCredential.user);

    return idToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Função que faz o cadastro no firebase e retorna o idToken */
const firebaseSignUp = async ({ name: nome, email, password }) => {
  console.log('firebaseSignUp', nome, email, password);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('userCredential', userCredential);
    const idToken = await getIdToken(userCredential.user);

    // Cria um novo usuário na coleção 'usuários' do Firestore
    const usuarioDoc = doc(db, 'usuários', userCredential.user.uid);
    await setDoc(usuarioDoc, {
      uid: userCredential.user.uid,
      email,
      nome,
      dataCriacao: new Date().toISOString(),
      // aqui você pode adicionar mais campos, como 'assinaturaAtiva' e 'dataExpiracaoAssinatura'
      assinaturaAtiva: false,
      dataExpiracaoAssinatura: null,
    });

    return idToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Função que atualiza o perfil no firebase e retorna o idToken */
const firebaseUpdateProfile = async ({ uid, name, password }) => {
  console.log('firebaseUpdateProfile', uid, name, password);
  try {
    const user = auth.currentUser;

    // Verifica se o nome foi fornecido e o atualiza se necessário
    if (name) {
      await updateProfile(user, { displayName: name });

      // Atualiza o nome na coleção 'usuários' do Firestore
      const usuarioDoc = doc(db, 'usuários', user.uid);
      await updateDoc(usuarioDoc, { nome: name });
    }

    // Verifica se a senha foi fornecida e a atualiza se necessário
    if (password) {
      await updatePassword(user, password);
    }

    // Retorna o idToken atualizado
    const idToken = await getIdToken(user);
    return idToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { firebaseSignIn, firebaseSignUp, firebaseUpdateProfile };
