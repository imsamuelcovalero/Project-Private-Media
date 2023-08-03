/* File: src/services/firebase.helper.jsx */
import {
  signInWithEmailAndPassword,
  getIdToken,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {
  collection, getDocs, doc, setDoc, updateDoc, getDoc,
} from 'firebase/firestore';
import { auth, db } from './firebase';

/* Função que busca as fotos e vídeos da categoria 'sample' */
const firebaseGetSampleCategory = async () => {
  try {
    const sampleCategoryDoc = collection(db, 'categorias');
    const snapshot = await getDocs(sampleCategoryDoc);
    let sampleData = null;

    snapshot.forEach((document) => {
      const data = document.data();
      if (data.categoriaId === 'sample') {
        sampleData = data;
      }
    });

    // Agora, para cada foto e vídeo, obtenha os dados correspondentes
    const fotosPromises = sampleData.fotos.map((idFoto) => getDoc(doc(db, 'fotos', idFoto)));
    const fotosDocs = await Promise.all(fotosPromises);
    const fotosData = fotosDocs.map((fotoDoc) => ({ id: fotoDoc.id, ...fotoDoc.data() }));

    const videosPromises = sampleData.videos.map((idVideo) => getDoc(doc(db, 'videos', idVideo)));
    const videosDocs = await Promise.all(videosPromises);
    const videosData = videosDocs.map((videoDoc) => ({ id: videoDoc.id, ...videoDoc.data() }));

    // Atualize sampleData para incluir os dados reais de fotos e vídeos, não apenas os IDs
    sampleData = {
      ...sampleData,
      fotos: fotosData,
      videos: videosData,
    };

    return sampleData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
const firebaseUpdateProfile = async ({ name, password }) => {
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

/* Função que faz a reautenticação do usuário */
const firebaseReauthenticate = async (email, password) => {
  try {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(email, password);

    await reauthenticateWithCredential(user, credential);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  firebaseSignIn, firebaseSignUp, firebaseUpdateProfile, firebaseReauthenticate,
  firebaseGetSampleCategory,
};
