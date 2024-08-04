import React from 'react';
import './style.css';

interface ButtonProps {
  color: 'primary' | 'secondary';
  size?: 'larger' |  'short'
  onClick?: (e: React.FormEvent) => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({ color, onClick, children, size,  type, disabled }) => {
    const colorClass = color === 'primary'  ? 'button-primary' : 'button-secondary';
    const sizeClass = size === 'larger'  ? 'larger' : 'short';
    const buttonClass = `${colorClass} ${sizeClass}`;
 
    return (
        <button disabled={disabled} type={type} role="button" className={buttonClass} onClick={onClick&&onClick}>
        {children}
        </button>
    );
};

export default Button;
