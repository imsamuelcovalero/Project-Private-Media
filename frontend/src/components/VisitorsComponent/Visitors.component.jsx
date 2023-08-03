import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import ReactNodeContext from '../../context/ReactNodeContext';
// import formatCurrency from '../FormatCurrency';
// import ProductsCard from './ProductsCard';
import api from '../../services';
import { firebaseGetSampleCategory } from '../../services/firebase.helper';
// import { removeUserInfo } from '../../helpers/localStorage.helper';
import ReactNodeContext from '../../context/ReactNodeContext';
import { VisitorsS } from './Style';

function VisitorsComponent() {
  const { logout } = useContext(ReactNodeContext);
  const navigate = useNavigate();
  const [mediaToRender, setMediaToRender] = useState(null);

  /* useEffect que busca as fotos e vídeos da categoria 'sample' */
  useEffect(() => {
    const getSampleCategory = async () => {
      try {
        const sampleData = await firebaseGetSampleCategory();
        console.log('sampleData', sampleData);
        setMediaToRender(sampleData);
      } catch (error) {
        console.error(error);
        logout();
        navigate('/visitors');
      }
    };

    getSampleCategory();
  }, []);

  // console.log('mediaToRender', mediaToRender);

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.checkToken();
        // console.log('data', data);
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
      <p>{mediaToRender}</p>
    </VisitorsS>
  );
}

export default VisitorsComponent;
