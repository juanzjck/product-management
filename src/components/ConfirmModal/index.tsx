import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Button from '../Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  productName: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onRequestClose, onConfirm, productName  }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="modal">
        <p className='modal-messagge'>¿Estás seguro de eliminar el producto {productName}?</p>
        <div className="modal-buttons">
            <Button size="larger" color="secondary" onClick={onRequestClose}>Cancelar</Button>
            <Button size="larger" color="primary" onClick={onConfirm}>Confirmar</Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
