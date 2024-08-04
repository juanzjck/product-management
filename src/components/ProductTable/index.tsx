import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../interfaces/Product';
import './style.css';
import { formatDate } from '../../utils/dateUtils';
import { FiMoreVertical } from "react-icons/fi";
import ConfirmModal from '../ConfirmModal';
import { deleteProduct } from '../../services/productService';
import { FaCircleInfo } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

interface ProductTableProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
  onDelete: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onDelete }) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setIsContextMenuOpen({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openModalDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsContextMenuOpen({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct.id || '');
        onDelete();
        closeModal();
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  const onErrorImg = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.hidden = true;
  };

  const toggleContextMenu = (index: number) => {
    setIsContextMenuOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {products.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className='logo-th'>Logo</th>
              <th>Nombre del producto</th>
              <th>
                <div className='th-flex'>
                  Descripción <FaCircleInfo className='info-icon' />
                </div>
              </th>
              <th> <div className='th-flex'>Fecha de liberación <FaCircleInfo className='info-icon' /></div></th>
              <th><div className='th-flex'>Fecha de reestructuración <FaCircleInfo className='info-icon' /> </div></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td><div className='container-product-img'><img height='25px' onError={(event) => onErrorImg(event)} src={product.logo} /></div></td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{formatDate(product.date_release)}</td>
                <td>{formatDate(product.date_revision)}</td>
                <td>
                  <FiMoreVertical role="button" className='actions' onClick={() => toggleContextMenu(index)} />
                  {isContextMenuOpen[index] && (
                    <div ref={contextMenuRef} className='contextual-menu'>
                      <div onClick={() => openModalDeleteProduct(product)} className='contextual-menu-item'>
                        Eliminar
                      </div>
                      <div onClick={()=> navigate(`/product/edit/${product.id}`)} className='contextual-menu-item'>
                        Editar
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {products.length === 0 && <p className='p-no-products'>No hay productos</p>}

      <ConfirmModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={handleDelete}
        productName={selectedProduct?.name || ''}
      />
    </>
  );
};

export default ProductTable;
