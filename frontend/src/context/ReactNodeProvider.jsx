/* File: src/context/ReactNodeProvider.jsx */
import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ReactNodeContext from './ReactNodeContext';
import { firebaseGetCategory } from '../services/firebase.helper';
import { getUserInfo, removeUserInfo } from '../helpers/localStorage.helper';
import api from '../services';

function ReactNodeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(getUserInfo());
  const [categoryPhotos, setCategoryPhotos] = useState([]);
  const [categoryVideos, setCategoryVideos] = useState([]);

  const [mediaSelected, setMediaSelected] = useState(false);

  const navigate = useNavigate();

  const categoryIds = [
    process.env.REACT_APP_FIREBASE_CATEGORY_ID1,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID2,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID3,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID4,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID5,
  ];

  useEffect(() => {
    setUser(getUserInfo()); // Atualiza o estado do usuário sempre que o componente é montado
  }, []);

  const handleLogout = async () => {
    try {
      await api.logout();
      removeUserInfo();
      setUser(null); // Defina o estado do usuário como null depois de fazer logout
      navigate('/visitors');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const getCategoryData = async (categoryId) => {
    try {
      const data = await firebaseGetCategory(categoryId);
      console.log('data', data);
      setCategoryPhotos(data.fotos);
      setCategoryVideos(data.videos);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

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
  }), [theme, user, categoryPhotos, categoryVideos, categoryIds, mediaSelected]);

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
