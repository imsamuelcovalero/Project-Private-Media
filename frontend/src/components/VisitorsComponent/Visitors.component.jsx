import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import ReactNodeContext from '../../context/ReactNodeContext';
// import formatCurrency from '../FormatCurrency';
// import ProductsCard from './ProductsCard';
import { VisitorsS } from './Style';
import api from '../../services';
import { removeUserInfo } from '../../helpers/localStorage.helper';

function VisitorsComponent() {
  const navigate = useNavigate();

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.checkToken();
        // if (data && data.assinaturaAtiva.status) {
        //   navigate('/main');
        // } else if (data && !data.assinaturaAtiva.status) {
        //   navigate('/visitors');
        // }
      } catch (error) {
        console.error(error);
        removeUserInfo();
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
