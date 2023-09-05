/* File: src/context/ReactNodeProvider.jsx */
import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactNodeContext from './ReactNodeContext';
import api from '../services';
import { firebaseGetCategory, firebaseGetMediaByCategoryAndId } from '../services/firebase.helper';
import {
  getUserInfo, removeUserInfo, getMediasTime, addMediasTimeToLocalStorage,
  getLastMediaDocs, storeLastMediaDocs,
} from '../helpers/localStorage.helper';
import categoryIds from '../helpers/categoryIds.helper';

function ReactNodeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(getUserInfo());

  const [currentMainUrl, setCurrentMainUrl] = useState(`/main/${categoryIds[0]}`);
  const [currentCategory, setCurrentCategory] = useState(categoryIds[0]);
  const [mediaSelected, setMediaSelected] = useState(null);

  const userInfo = getUserInfo();
  const [isSignatureActive, setIsSignatureActive] = useState(userInfo
    && userInfo.assinaturaAtiva ? userInfo.assinaturaAtiva.status : false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  const [viewMode, setViewMode] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* useEffect que verifica a url atual e define a categoria atual e a url principal,
  usada pelo botão MAIN */
  useEffect(() => {
    const path = location.pathname;
    const mainPattern = /^\/main\/([a-zA-Z0-9-_]+)(\/|$)/; // Regex para capturar /main/{categoryId}/
    const matches = path.match(mainPattern);
    if (matches && matches[1]) {
      setCurrentMainUrl(`/main/${matches[1]}`);
      setCurrentCategory(matches[1]);
    }
  }, []);

  useEffect(() => {
    /* Se mediaSelected já estiver definido, não precisamos fazer mais nada */
    if (mediaSelected) return;

    const pattern = /^\/([a-zA-Z0-9-_]+)\/(fotos|videos)\/([a-zA-Z0-9-_]+)/; // Regex para capturar /{categoryId}/{mediaType}/{mediaId}
    const matches = location.pathname.match(pattern);

    /* Se a URL atual não corresponde à URL de uma mídia, saímos do useEffect */
    if (!matches) return;

    const extractInfoFromURL = () => {
      if (matches && matches[1] && matches[2] && matches[3]) {
        return {
          categoriaId: matches[1],
          mediaType: matches[2],
          mediaId: matches[3],
        };
      }
      return null;
    };

    const loadMediaFromURL = async () => {
      const info = extractInfoFromURL();

      if (!info) {
        console.error('Informações não extraídas da URL');
        toast.error('Não conseguimos encontrar a mídia que você está procurando.');
        navigate(currentMainUrl);
        return;
      }

      try {
        const media = await firebaseGetMediaByCategoryAndId(
          info.categoriaId,
          info.mediaType,
          info.mediaId,
        );
        if (media) {
          setMediaSelected({
            mediaType: info.mediaType,
            media,
          });
        } else {
          toast.warning('Mídia não encontrada. Redirecionando para a página principal.');
          navigate(currentMainUrl);
        }
      } catch (error) {
        console.error('Erro ao buscar mídia:', error);
        toast.error('Houve um problema ao tentar carregar a mídia. Por favor, tente novamente mais tarde.');
        navigate(currentMainUrl);
      }
    };

    loadMediaFromURL();
  }, []);

  /* useEffect que verifica se o usuário está logado e tem a assinatura ativa */
  useEffect(() => {
    if (!user) {
      setIsUserLogged(false);
      setIsSignatureActive(false);
    } else {
      setIsUserLogged(true);
      if (user.assinaturaAtiva.status) {
        setIsSignatureActive(true);
      } else {
        setIsSignatureActive(false);
      }
    }
  }, [user]);

  /* função que faz logout */
  const handleLogout = async (redirectToHome = true) => {
    try {
      await api.logout();
      removeUserInfo();
      setUser(null);
      if (redirectToHome) {
        navigate(`/main/${categoryIds[0]}`);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  /*
   Seção de funções para requisitar as mídias
  */

  /* Função que embaralha um array e retorna os primeiros count elementos */
  const getRandomElements = (arr, count) => {
    if (!Array.isArray(arr)) {
      console.error('getRandomElements espera um array como primeiro argumento');
      return [];
    }

    const shuffled = arr.slice(0);
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  /* Função que busca as fotos ou vídeos de uma categoria específica no Firebase,
  para usuários sem assinatura ativa */
  const getMediaFromFirebase = async (categoryId, mediaType) => {
    try {
      // Buscar os últimos documentos do localstorage
      const lastMediaDocResult = getLastMediaDocs(categoryId, mediaType);

      if (lastMediaDocResult && lastMediaDocResult.errorCode) {
        toast.error(lastMediaDocResult.message);
        return null;
      }

      // Consulta os dados com base nos últimos documentos
      let data = await firebaseGetCategory(categoryId, mediaType, lastMediaDocResult);

      // Se os dados retornados são menos do que 10, reinicia a busca
      if (!data || data.length < 10) {
        console.log('reiniciando a busca');
        storeLastMediaDocs(categoryId, mediaType, null);
        data = await firebaseGetCategory(categoryId, mediaType, null);
      }

      // Armazena o último documento para futuras consultas
      if (data && data.length) {
        const storeResult = storeLastMediaDocs(categoryId, mediaType, data[data.length - 1]);
        if (storeResult && storeResult.errorCode) {
          toast.error(storeResult.message);
          return null;
        }
      }

      // Seleciona aleatoriamente se a assinatura não estiver ativa
      const randomMedia = getRandomElements(data, 5);
      const result = addMediasTimeToLocalStorage(categoryId, mediaType, randomMedia);

      if (result && result.errorCode) {
        toast.error(result.message);
      }

      return randomMedia;
    } catch (error) {
      console.error('Error fetching media from Firebase:', error);
      toast.error('Erro ao buscar mídias no Firebase.');
      return null;
    }
  };

  /* Função principal de busca de mídias, que faz as verificações iniciais e chama as funções
  específicas para cada caso */
  const getCategoryData = async (mediaType, page) => {
    try {
      if (isSignatureActive) {
        const result = await firebaseGetCategory(
          currentCategory,
          mediaType,
          page,
          10,
          isSignatureActive,
        );

        return result;
      }
      const storedMedias = await getMediasTime(currentCategory, mediaType);

      if (storedMedias && storedMedias.errorCode) {
        toast.error(storedMedias.message);
        return null;
      }

      const twoHours = 2 * 60 * 60 * 1000;

      if (storedMedias && storedMedias.data.length > 0
        && (Date.now() - storedMedias.time) < twoHours) {
        return storedMedias.data;
      }

      return await getMediaFromFirebase(currentCategory, mediaType);
    } catch (error) {
      console.error('Error fetching category data:', error);
      toast.error('Erro ao buscar dados da categoria.');
      return null;
    }
  };

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    user,
    setUser,
    logout: handleLogout,
    getCategoryData,
    categoryIds,
    mediaSelected,
    setMediaSelected,
    viewMode,
    setViewMode,
    currentMainUrl,
    setCurrentMainUrl,
    currentCategory,
    setCurrentCategory,
    isSignatureActive,
    setIsSignatureActive,
    isUserLogged,
    setIsUserLogged,
  }), [theme, user, categoryIds, mediaSelected,
    viewMode, currentMainUrl, currentCategory, isSignatureActive, isUserLogged]);

  ReactNodeProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <ReactNodeContext.Provider value={contextValue}>
      {children}
    </ReactNodeContext.Provider>
  );
}

export default ReactNodeProvider;
