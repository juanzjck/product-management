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
        <div onClick={()=>navigation('/')} className='header'>
            <FaMoneyBillWave  className='logo-icon'/>
            <h1 className="web-title">BANCO</h1>
        </div>
    
      {children}
    </>
  );
};

export default Layout;