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

/* Função auxiliar que busca as fotos e vídeos para usuários com assinatura */
const fetchMediaForSubscribedUsers = async (
  mediaType,
  categoryId,
  pageNumber = 1,
  maxResults = 10,
) => {
  const newPageNumber = !pageNumber ? 1 : pageNumber;
  let lastDocument = null;

  if (newPageNumber !== 1) {
    const skipCount = (newPageNumber - 1) * maxResults;

    const skipSnapshot = await getDocs(
      query(
        collection(db, mediaType),
        where('categoriaId', '==', categoryId),
        orderBy('dataCriacao'),
        limit(skipCount),
      ),
    );

    // Se não tivermos documentos suficientes para pular, significa que estamos em uma página vazia
    if (skipSnapshot.size < skipCount) return { data: [], hasNextPage: false };

    lastDocument = skipSnapshot.docs[skipSnapshot.docs.length - 1];
  }

  const mediaQuery = lastDocument
    ? query(
      collection(db, mediaType),
      where('categoriaId', '==', categoryId),
      orderBy('dataCriacao'),
      startAfter(lastDocument),
      limit(maxResults),
    )
    : query(
      collection(db, mediaType),
      where('categoriaId', '==', categoryId),
      orderBy('dataCriacao'),
      limit(maxResults),
    );

  const mediaSnapshot = await getDocs(mediaQuery);
  const resultData = mediaSnapshot.docs
    .map((mediaDoc) => ({ id: mediaDoc.id, ...mediaDoc.data() }));

  // Consulta para verificar se há uma próxima página
  const nextPageQuery = query(
    collection(db, mediaType),
    where('categoriaId', '==', categoryId),
    orderBy('dataCriacao'),
    startAfter(mediaSnapshot.docs[mediaSnapshot.docs.length - 1] || []),
    limit(1),
  );

  const nextPageSnapshot = await getDocs(nextPageQuery);
  const hasNextPage = nextPageSnapshot.size > 0;

  return { data: resultData, hasNextPage };
  // retornamos os dados e a informação de se há próxima página
};

/* Função auxiliar que busca as fotos e vídeos para usuários sem assinatura */
const fetchMediaForNonSubscribedUsers = async (
  mediaType,
  categoryId,
  lastDoc,
  maxResults = 10,
) => {
  let mediaQuery;
  if (lastDoc) {
    // Se temos um lastDoc, usamos ele como ponto de partida para a próxima consulta.
    mediaQuery = query(
      collection(db, mediaType),
      where('categoriaId', '==', categoryId),
      orderBy('dataCriacao'),
      startAfter(lastDoc),
      limit(maxResults),
    );
  } else {
    // Se não temos um lastDoc, é a primeira consulta e fazemos
    // igual aos usuários assinantes na primeira página.
    mediaQuery = query(
      collection(db, mediaType),
      where('categoriaId', '==', categoryId),
      orderBy('dataCriacao'),
      limit(maxResults),
    );
  }

  const mediaSnapshot = await getDocs(mediaQuery);
  const resultData = mediaSnapshot.docs
    .map((mediaDoc) => ({ id: mediaDoc.id, ...mediaDoc.data() }));

  return { data: resultData };
};

/* Função auxiliar que busca as fotos e vídeos de uma categoria específica */
const fetchMedia = async (
  mediaType,
  categoryId,
  pageOrLastDoc,
  maxResults = 10,
  isSubscribed = false,
) => {
  if (isSubscribed) {
    const result = await fetchMediaForSubscribedUsers(
      mediaType,
      categoryId,
      pageOrLastDoc,
      maxResults,
    );

    return result;
  }
  return fetchMediaForNonSubscribedUsers(mediaType, categoryId, pageOrLastDoc, maxResults);
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
    const mediaData = await fetchMedia(
      mediaType,
      categoryId,
      pageOrLastDoc,
      maxResults,
      isSubscribed,
    );

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
