import React from 'react';
import './style.css';
import { FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigation = useNavigate();
  return (
    <>
        <div className='header'>
            <FaMoneyBillWave  onClick={()=>navigation('/')}  className='logo-icon'/>
            <h1  onClick={()=>navigation('/')} className="web-title">BANCO</h1>
        </div>
        <div className='container'>
          {children}
        </div>
    </>
  );
};

export default Layout;