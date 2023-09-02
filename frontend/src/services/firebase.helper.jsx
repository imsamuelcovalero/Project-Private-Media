/* File: src/services/firebase.helper.jsx */
import {
  signInWithEmailAndPassword,
  getIdToken,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where,
} from 'firebase/firestore';
import { auth, db } from './firebase.config';

/* Função que busca as fotos e vídeos de uma categoria específica */
const firebaseGetCategory = async (categoryId) => {
  try {
    const categoriesCollection = collection(db, 'categorias');
    const snapshot = await getDocs(categoriesCollection);
    let categoryData = null;

    snapshot.forEach((document) => {
      const data = document.data();
      if (data.categoriaId === categoryId) {
        categoryData = data;
      }
    });

    if (!categoryData) {
      return null;
    }

    const fotosPromises = categoryData.fotos.map((idFoto) => getDoc(doc(db, 'fotos', idFoto)));
    const fotosDocs = await Promise.all(fotosPromises);
    const fotosData = fotosDocs.map((fotoDoc) => ({ id: fotoDoc.id, ...fotoDoc.data() }));

    const videosPromises = categoryData.videos.map((idVideo) => getDoc(doc(db, 'videos', idVideo)));
    const videosDocs = await Promise.all(videosPromises);
    const videosData = videosDocs.map((videoDoc) => ({ id: videoDoc.id, ...videoDoc.data() }));

    categoryData = {
      ...categoryData,
      fotos: fotosData,
      videos: videosData,
    };

    return categoryData;
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

/* Função que enviará um email para redefinir a senha */
const firebaseSendPasswordResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Função que faz o cadastro no firebase e retorna o idToken */
const firebaseSignUp = async ({ name: nome, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await getIdToken(userCredential.user);

    /* Cria um novo usuário na coleção 'usuários' do Firestore */
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

    /* Verifica se o nome foi fornecido e o atualiza se necessário */
    if (name) {
      await updateProfile(user, { displayName: name });

      /* Atualiza o nome na coleção 'usuários' do Firestore */
      const usuarioDoc = doc(db, 'usuários', user.uid);
      await updateDoc(usuarioDoc, { nome: name });
    }

    /* Verifica se a senha foi fornecida e a atualiza se necessário */
    if (password) {
      await updatePassword(user, password);
    }

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

/* Função que busca uma foto ou vídeo de uma categoria específica */
const firebaseGetMediaByCategoryAndId = async (categoriaId, mediaType, mediaId) => {
  try {
    if (!['fotos', 'videos'].includes(mediaType)) {
      console.error('Invalid media type provided');
      return null;
    }

    const categoryQuery = query(collection(db, 'categorias'), where('categoriaId', '==', categoriaId));
    const categorySnapshot = await getDocs(categoryQuery);

    if (categorySnapshot.empty) {
      console.error('Category does not exist');
      return null;
    }

    const categoryDoc = categorySnapshot.docs[0];
    const mediaList = categoryDoc.data()[mediaType];

    if (!mediaList.includes(mediaId)) {
      console.error(`${mediaType.slice(0, -1)} does not exist in the given category`);
      return null;
    }

    /* Se o media existir na lista, obtenha o documento na respectiva coleção (fotos ou videos) */
    const mediaDoc = await getDoc(doc(db, mediaType, mediaId));
    if (!mediaDoc.exists) {
      console.error(`${mediaType.slice(0, -1)} document does not exist`);
      return null;
    }

    return { id: mediaDoc.id, ...mediaDoc.data() };
  } catch (error) {
    console.error(`Error fetching ${mediaType.slice(0, -1)} by category and ID:`, error);
    throw error;
  }
};

export {
  firebaseSignIn, firebaseSignUp, firebaseUpdateProfile, firebaseReauthenticate,
  firebaseGetCategory, firebaseSendPasswordResetEmail, firebaseGetMediaByCategoryAndId,
};
