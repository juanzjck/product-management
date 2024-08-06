import React from 'react';
import ProductForm from '../components/ProductForm';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';

const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <Layout>
        <ProductForm  id={id} />
        </Layout>
    );
};

export default EditProductPage;
