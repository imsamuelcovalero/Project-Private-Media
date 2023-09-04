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
  collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where, orderBy,
  startAfter, limit,
} from 'firebase/firestore';
import { auth, db } from './firebase.config';

/*
* Trecho para buscar as fotos e vídeos de uma categoria específica
*/

/* Função auxiliar que busca as fotos e vídeos de uma categoria específica */
const fetchMedia = async (
  mediaType,
  categoryId,
  pageOrLastDoc = 1,
  maxResults = 10,
  isSubscribed = false,
) => {
  // Se o usuário tem uma assinatura
  if (isSubscribed) {
    console.log('pageOrLastDoc', pageOrLastDoc);

    // Caso esteja na primeira página, busque apenas os maxResults iniciais
    if (pageOrLastDoc === 1) {
      const mediaQuery = query(
        collection(db, mediaType),
        where('categoriaId', '==', categoryId),
        orderBy('dataCriacao'),
        limit(maxResults),
      );

      const mediaSnapshot = await getDocs(mediaQuery);
      console.log('mediaSnapshot1', mediaSnapshot);
      const result = mediaSnapshot.docs
        .map((mediaDoc) => ({ id: mediaDoc.id, ...mediaDoc.data() }));
      console.log('result', result);
      return result;
    }

    // Caso contrário, pule os documentos anteriores e busque os próximos maxResults
    const skipCount = (pageOrLastDoc - 1) * maxResults;

    const skipSnapshot = await getDocs(
      query(
        collection(db, mediaType),
        where('categoriaId', '==', categoryId),
        orderBy('dataCriacao'),
        limit(skipCount),
      ),
    );

    // Se o número de documentos que temos é menor do que o que queremos pular, não há mais páginas
    if (skipSnapshot.size < skipCount) {
      return null;
    }

    // O último documento na "skipSnapshot" é onde começaremos nossa próxima busca
    const lastDocument = skipSnapshot.docs[skipSnapshot.docs.length - 1];

    const mediaQuery = query(
      collection(db, mediaType),
      where('categoriaId', '==', categoryId),
      orderBy('dataCriacao'),
      startAfter(lastDocument),
      limit(maxResults),
    );

    const mediaSnapshot = await getDocs(mediaQuery);
    console.log('mediaSnapshot2', mediaSnapshot);
    return mediaSnapshot.docs.map((mediaDoc) => ({ id: mediaDoc.id, ...mediaDoc.data() }));
  }

  // Usuários sem assinatura
  const mediaQuery = query(
    collection(db, mediaType),
    where('categoriaId', '==', categoryId),
    orderBy('dataCriacao'),
    ...(pageOrLastDoc ? [startAfter(pageOrLastDoc)] : []),
    limit(maxResults),
  );

  const mediaSnapshot = await getDocs(mediaQuery);
  return mediaSnapshot.docs.map((mediaDoc) => ({ id: mediaDoc.id, ...mediaDoc.data() }));
};

/* Função que busca as fotos e vídeos de uma categoria específica */
const firebaseGetCategory = async (
  categoryId,
  mediaType,
  pageOrLastDoc = null,
  maxResults = 10,
  isSubscribed = false,
) => {
  try {
    // Criando uma query para buscar diretamente pela categoria desejada
    // const categoryQuery = query(
    //   collection(db, 'categorias'),
    //   where('categoriaId', '==', categoryId),
    // );
    // // console.log('categoryQuery', categoryQuery);
    // const categorySnapshot = await getDocs(categoryQuery);
    // // console.log('categorySnapshot', categorySnapshot);
    // let categoryData = null;

    // if (!categorySnapshot.empty) {
    //   categoryData = categorySnapshot.docs[0].data();
    //   // console.log('categoryData', categoryData);
    // } else {
    //   return null;
    // }

    const mediaData = await fetchMedia(
      mediaType,
      categoryId,
      pageOrLastDoc,
      maxResults,
      isSubscribed,
    );
    console.log('mediaData', mediaData);

    // categoryData = {
    //   ...categoryData,
    //   [mediaType]: mediaData,
    // };

    return mediaData;
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
