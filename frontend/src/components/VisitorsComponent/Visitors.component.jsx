import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import ReactNodeContext from '../../context/ReactNodeContext';
// import formatCurrency from '../FormatCurrency';
// import ProductsCard from './ProductsCard';
import { VisitorsS } from './Style';
import api from '../../services';
// import { removeUserInfo } from '../../helpers/localStorage.helper';
import ReactNodeContext from '../../context/ReactNodeContext';

function VisitorsComponent() {
  const { logout } = useContext(ReactNodeContext);
  const navigate = useNavigate();

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await api.checkToken();
        console.log('data', data);
        // if (data && data.assinaturaAtiva.status) {
        //   navigate('/main');
        // } else if (data && !data.assinaturaAtiva.status) {
        //   navigate('/visitors');
        // }
      } catch (error) {
        console.error(error);
        logout();
        navigate('/visitors');
      }
    };

    verifyToken();
  }, []);

  return (
    <VisitorsS>
      {/* <ProductsDivS>
        {productsToRender?.map((product) => (
          <div key={product.id}>
            <ProductsCard product={product} />
          </div>
        ))}
      </ProductsDivS> */}
      <h1>Página de Visitantes</h1>
    </VisitorsS>
  );
}

export default VisitorsComponent;
