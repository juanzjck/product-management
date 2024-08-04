import React from 'react';
import './style.css';

interface ButtonProps {
  color: 'primary' | 'secondary';
  onClick: (e: React.FormEvent) => void;
  children: React.ReactNode;
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ color, onClick, children }) => {
  const buttonClass = color === 'primary' ? 'button-primary' : 'button-secondary';

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
