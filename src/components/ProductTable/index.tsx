import React from 'react';
import { Product } from '../../interfaces/Product';
import './style.css';
import { formatDate } from '../../utils/dateUtils';

interface ProductTableProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <>

      { products.length > 0 && (
            <table>
            <thead>
              <tr>
                <th className='logo-th'>Logo</th>
                <th>Nombre del producto</th>
                <th>Descripción</th>
                <th>Fecha de liberación</th>
                <th>Fecha de reestructuración</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td><div className='container-product-img'><img height='25px' src={product.logo} /></div></td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{formatDate(product.date_release)}</td>
                  <td>{formatDate(product.date_revision)}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
      )}

      {
        products.length === 0 && <p className='p-no-products'>No hay productos</p>
      }
    </>
  );
};

export default ProductTable;
