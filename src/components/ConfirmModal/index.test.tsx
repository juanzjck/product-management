import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from './index';
import '@testing-library/jest-dom';

describe('ConfirmModal', () => {
  const setup = (isOpen = true, onRequestClose = jest.fn(), onConfirm = jest.fn(), productName = 'Test Product') => {
    render(
      <ConfirmModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        onConfirm={onConfirm}
        productName={productName}
      />
    );

    return { onRequestClose, onConfirm };
  };

  test('renders correctly when open', () => {
    setup();

    expect(screen.getByText(/¿Estás seguro de eliminar el producto Test Product?/i)).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
  });

  test('calls onRequestClose when the Cancel button is clicked', () => {
    const { onRequestClose } = setup();

    fireEvent.click(screen.getByText('Cancelar'));

    expect(onRequestClose).toHaveBeenCalled();
  });

  test('calls onConfirm when the Confirm button is clicked', () => {
    const { onConfirm } = setup();

    fireEvent.click(screen.getByText('Confirmar'));

    expect(onConfirm).toHaveBeenCalled();
  });

  test('does not render when closed', () => {
    setup(false);

    expect(screen.queryByText('¿Estás seguro de eliminar el producto Test Product?')).not.toBeInTheDocument();
  });
});
