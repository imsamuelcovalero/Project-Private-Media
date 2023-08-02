/* File: src/context/ReactNodeProvider.jsx */
import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { /* getFirestore,  */collection, getDocs } from 'firebase/firestore';
import ReactNodeContext from './ReactNodeContext';
import { getUserInfo, removeUserInfo } from '../helpers/localStorage.helper';
// import db from '../services/firebase';
import api from '../services';

function ReactNodeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  // const [products, setProducts] = useState([]);
  const [user, setUser] = useState(getUserInfo());

  useEffect(() => {
    setUser(getUserInfo()); // Atualiza o estado do usuário sempre que o componente é montado
  }, []);

  const handleLogout = async () => {
    try {
      await api.logout();
      removeUserInfo();
      setUser(null); // Defina o estado do usuário como null depois de fazer logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const produtosRef = collection(db, 'produtos');
  //     const produtosSnapshot = await getDocs(produtosRef);
  //     const produtosData = produtosSnapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       const { id } = doc;
  //       return {
  //         id,
  //         name: data['Descrição'],
  //         urlImage: data['Imagem Url'],
  //         price: data['Preço'],
  //       };
  //     });
  //     setProducts(produtosData);
  //   };

  //   fetchProducts();
  // }, []);

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    // products,
    user,
    setUser,
    logout: handleLogout,
  }), [theme, user]);

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
