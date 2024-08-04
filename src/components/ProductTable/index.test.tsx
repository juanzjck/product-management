import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductTable from './index';
import { deleteProduct as mockDeleteProduct } from '../../services/productService';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../../services/productService', () => ({
  deleteProduct: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const products = [
  {
    id: '1',
    name: 'Producto 1',
    description: 'Descripción 1',
    logo: 'https://example.com/logo1.png',
    date_release: '2023-01-01',
    date_revision: '2024-01-01',
  },
  {
    id: '2',
    name: 'Producto 2',
    description: 'Descripción 2',
    logo: 'https://example.com/logo2.png',
    date_release: '2023-02-01',
    date_revision: '2024-02-01',
  }
];

describe('ProductTable', () => {
  const setup = () => {
    const onDelete = jest.fn();
    render(
      <Router>
        <ProductTable products={products} onDelete={onDelete} />
      </Router>
    );
    return { onDelete };
  };

  test('renders product table with products', () => {
    setup();

    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 2')).toBeInTheDocument();
    expect(screen.getByText('Descripción 1')).toBeInTheDocument();
    expect(screen.getByText('Descripción 2')).toBeInTheDocument();
  });

  test('opens contextual menu on clicking more actions icon', () => {
    setup();

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(screen.getByText('Eliminar')).toBeInTheDocument();
    expect(screen.getByText('Editar')).toBeInTheDocument();
  });

  test('closes contextual menu when clicking outside', () => {
    setup();

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(screen.getByText('Eliminar')).toBeInTheDocument();
    expect(screen.getByText('Editar')).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByText('Eliminar')).not.toBeInTheDocument();
    expect(screen.queryByText('Editar')).not.toBeInTheDocument();
  });

  test('calls handleDelete when the Confirm button is clicked', async () => {
    const { onDelete } = setup();
    (mockDeleteProduct as jest.Mock).mockResolvedValueOnce({});

    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByText('Eliminar'));
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => expect(mockDeleteProduct).toHaveBeenCalledWith('1'));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('¿Estás seguro de eliminar el producto Producto 1?')).not.toBeInTheDocument();
  });

  test('calls navigate when Edit button is clicked', () => {
    setup();

    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByText('Editar'));

    expect(mockNavigate).toHaveBeenCalledWith('/product/edit/1');
  });

  test('renders no products message when product list is empty', () => {
    render(
      <Router>
        <ProductTable products={[]} onDelete={jest.fn()} />
      </Router>
    );
    expect(screen.getByText('No hay productos')).toBeInTheDocument();
  });

  test('replaces image on error', () => {
    setup();

    const img = screen.getAllByRole('img')[0] as HTMLImageElement;
    fireEvent.error(img);

    expect(img.hidden).toBeTruthy();
  });
});
