import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProductPage from './pages/CreateProductPage';
import './App.css';
import EditProductPage from './pages/EditProductPage';

const App: React.FC = () => {
  return ( 
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/product/new" Component={CreateProductPage} />
      <Route path="/product/edit/:id" element={<EditProductPage />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
