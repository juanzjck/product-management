import React, { useEffect, useState } from 'react';
import ProductSearch from '../ProductSearch';
import ProductTable from '../ProductTable';
import { Product } from '../../interfaces/Product';
import './style.css';
import Skeleton from 'react-loading-skeleton';
import { fetchProductList } from '../../services/productService';
import CustomSelect from '../CustomSelect';
import { Option } from '../../interfaces/ui';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const sizeOptions: Option[] = [
    {
        value: 5,
        label: 5
    },{
        value: 10,
        label: 10
    },{
        value: 20,
        label: 20
    },
];

const ProductList: React.FC = () => {
    const [selectedSize, setSelectedSize] = useState<number>(5);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const navigateToCreateProduct = () => {
        navigate('/product/new');
    };
    useEffect(() => {
    const fetchData = async () => {
      try {
        const productList = await fetchProductList();
        setProducts(productList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    }, []);

    const handleSizeChange = (value: number | string) => {
        setSelectedSize(Number(value));
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, selectedSize );
    
    return (
        <div className="product-list">
           <div className='flex-actions'>
                <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Button color="primary" onClick={navigateToCreateProduct}>Agregar</Button>
           </div>
          
            {loading 
                ?<Skeleton className="skeleton" count={5} height={40} style={{ marginBottom: '10px' }} /> 
                :<div className='product-list-content'>
                    <ProductTable products={filteredProducts} /> 
                </div>
            }
            <div className='product-list-controlers'>
                <div className="results-count">{filteredProducts.length} Resultados</div>
                <CustomSelect onChange={handleSizeChange}  label="" value={selectedSize} options={sizeOptions}/>
            </div>
        
        </div>
    );
};

export default ProductList;
