/* File: src/services/firebase.helper.jsx */
import { signInWithEmailAndPassword, getIdToken, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

/* Função que faz o login no firebase e retorna o idToken */
const firebaseSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await getIdToken(userCredential.user);

    return idToken;
  } catch (error) {
    console.error(error);
    return null;
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
    if (error.message.includes('auth/email-already-in-use')) {
      throw new Error('O e-mail já está em uso. Por favor, tente outro.');
    }
    return null;
  }
};

export { firebaseSignIn, firebaseSignUp };
