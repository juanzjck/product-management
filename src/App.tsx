import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProductPage from './pages/CreateProductPage';
import './App.css';

const App: React.FC = () => {
  return ( 
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/product/new" Component={CreateProductPage} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
