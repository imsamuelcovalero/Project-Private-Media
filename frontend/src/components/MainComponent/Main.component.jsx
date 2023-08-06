import React, { useContext, useEffect/* , useState */ } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';
import MainS from './Style';

function MainComponent() {
  const { logout } = useContext(ReactNodeContext);

  const navigate = useNavigate();

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await api.checkToken();
        if (!data.assinaturaAtiva.status) {
          navigate('/visitors');
        }
      } catch (error) {
        console.error(error);
        toast.error('Sessão expirada, faça login novamente');
        logout();
        navigate('/visitors');
      }
    };

    verifyToken();
  }, []);

  const categoryIds = [
    process.env.REACT_APP_FIREBASE_CATEGORY_ID1,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID2,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID3,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID4,
    process.env.REACT_APP_FIREBASE_CATEGORY_ID5,
  ];

  return (
    <MainS>
      <h1>Página Main</h1>
      <ul>
        {categoryIds.map((categoryId) => (
          <li key={categoryId}>
            <Link to={`/main/${categoryId}`}>{categoryId}</Link>
          </li>
        ))}
      </ul>
    </MainS>
  );
}

export default MainComponent;
