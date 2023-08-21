/* File: src/context/ReactNodeProvider.jsx */
import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactNodeContext from './ReactNodeContext';
import { firebaseGetCategory, firebaseGetMediaByCategoryAndId } from '../services/firebase.helper';
import { getUserInfo, removeUserInfo } from '../helpers/localStorage.helper';
import api from '../services';

function ReactNodeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(getUserInfo());

  const [currentMainUrl, setCurrentMainUrl] = useState(`/${process.env.REACT_APP_FIREBASE_CATEGORY_ID1}`);
  const [currentCategory, setCurrentCategory] = useState(process.env
    .REACT_APP_FIREBASE_CATEGORY_ID1);
  const [mediaSelected, setMediaSelected] = useState(null);
  console.log('mediaSelected', mediaSelected);

  const [categoryPhotos, setCategoryPhotos] = useState([]);
  const [categoryVideos, setCategoryVideos] = useState([]);

  const [isSignatureActive, setIsSignatureActive] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  const [viewMode, setViewMode] = useState(null);

  // const [isEditFormActivated, setIsEditFormActivated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const categoryIds = [
    process.env.REACT_APP_FIREBASE_CATEGORY_ID1,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID2,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID3,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID4,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID5,
  ];

  useEffect(() => {
    const path = location.pathname;
    const mainPattern = /^\/([a-zA-Z0-9-_]+)(\/|$)/; // Regex para capturar /main/{categoryId}/
    const matches = path.match(mainPattern);
    if (matches && matches[1]) {
      setCurrentMainUrl(`/${matches[1]}`);
      setCurrentCategory(matches[1]);
    }
  }, []);

  useEffect(() => {
    // Se mediaSelected já estiver definido, não precisamos fazer mais nada
    if (mediaSelected) return;

    const pattern = /^\/([a-zA-Z0-9-_]+)\/(fotos|videos)\/([a-zA-Z0-9-_]+)/; // Regex para capturar /{categoryId}/{mediaType}/{mediaId}
    const matches = location.pathname.match(pattern);

    // Se a URL atual não corresponde à URL de uma mídia, saímos do useEffect
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

  // console.log('currentCategory', currentCategory);
  // console.log('currentMainUrl', currentMainUrl);

  /* useEffect que verifica se o usuário está logado e tem a assinatura ativa */
  useEffect(() => {
    if (!user) {
      console.log('usuário não logado');
      setIsUserLogged(false);
      // setIsSignatureActive(false);
    } else {
      console.log('usuário logado');
      setIsUserLogged(true);
      console.log('user', user);
      if (user.assinaturaAtiva.status) {
        console.log('assinatura ativa');
        setIsSignatureActive(true);
      } else {
        console.log('assinatura inativa');
        setIsSignatureActive(false);
      }
    }
  }, [user]);

  /* função que faz logout */
  const handleLogout = async () => {
    try {
      await api.logout();
      removeUserInfo();
      setUser(null); // Defina o estado do usuário como null depois de fazer logout
      // setIsUserLogged(false);
      console.log('user', user);
      navigate(`/${categoryIds[0]}`);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const getCategoryData = async (categoryId) => {
    try {
      const data = await firebaseGetCategory(categoryId);
      // console.log('data', data);
      setCategoryPhotos(data.fotos);
      setCategoryVideos(data.videos);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  /* useEffect que busca as fotos e vídeos da categoryId referente */
  useEffect(() => {
    getCategoryData(currentCategory);
  }, [currentCategory]);

  // console.log('categoryPhotos', categoryPhotos, 'categoryVideos', categoryVideos);

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    user,
    setUser,
    logout: handleLogout,
    getCategoryData,
    categoryPhotos,
    categoryVideos,
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
  }), [theme, user, categoryPhotos, categoryVideos, categoryIds, mediaSelected,
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
