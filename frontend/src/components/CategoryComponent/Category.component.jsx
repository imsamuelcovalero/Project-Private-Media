import React, { useContext, useEffect/* , useState */ } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';
import CategoryS from './Style';

function CategoryComponent() {
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

  return (
    <CategoryS>
      <h1>Página de Categoria</h1>
    </CategoryS>
  );
}

export default CategoryComponent;
