import React from 'react';
import ProductList from '../components/ProductList';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
        <ProductList />
    </Layout>
  );
};

export default HomePage;
