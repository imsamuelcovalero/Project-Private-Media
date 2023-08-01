import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ReactNodeContext from '../../context/ReactNodeContext';
// import formatCurrency from '../FormatCurrency';
// import ProductsCard from './ProductsCard';
import { VisitorsS } from './Style';

function VisitorsComponent() {
  // const { products, balance } = useContext(ReactNodeContext);

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
