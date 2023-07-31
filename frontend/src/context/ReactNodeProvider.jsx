import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
// import { /* getFirestore,  */collection, getDocs } from 'firebase/firestore';
import ReactNodeContext from './ReactNodeContext';
// import db from '../services/firebase';

function ReactNodeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  // const [products, setProducts] = useState([]);
  // const [balance, setBalance] = useState(0);

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
  }), [theme]);

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
