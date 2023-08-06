import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ReactNodeContext from '../../context/ReactNodeContext';
// import formatCurrency from '../FormatCurrency';
// import ProductsCard from './ProductsCard';
import { MainS } from './Style';

function MainComponent() {
  // const { products, balance } = useContext(ReactNodeContext);

  return (
    <MainS>
      {/* <ProductsDivS>
        {productsToRender?.map((product) => (
          <div key={product.id}>
            <ProductsCard product={product} />
          </div>
        ))}
      </ProductsDivS> */}
      <h1>Página Main</h1>
    </MainS>
  );
}

export default MainComponent;
