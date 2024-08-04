import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductForm from './index';
import { createProduct, updateProduct, fetchProductList } from '../../services/productService';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

jest.mock('../../services/productService', () => ({
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  fetchProductList: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' }),
}));

describe('ProductForm', () => {
  const setup = (id?: string) => {
    render(
      <Router>
        <ProductForm id={id} />
      </Router>
    );
  };

  test('renders the form with fetched product data for editing', async () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'https://example.com/logo.png',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    };
    (fetchProductList as jest.Mock).mockResolvedValue([mockProduct]);

    setup('1');

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2023-01-01')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2024-01-01')).toBeInTheDocument();
    });
  });

  test('calls updateProduct when the form is submitted with an existing product', async () => {
    const mockProduct = {
      id: '2',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'https://example.com/logo.png',
      date_release: '2024-12-12',
      date_revision: '2025-12-12',
    };
    (fetchProductList as jest.Mock).mockResolvedValue([mockProduct]);
    (updateProduct as jest.Mock).mockResolvedValue({});

    setup('2');

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Nombre del Producto/i), { target: { value: 'Updated Product' } });
    fireEvent.click(screen.getByText(/Enviar/i));

    await waitFor(() => {
      expect(updateProduct).toHaveBeenCalledWith({
        ...mockProduct,
        name: 'Updated Product'
      });
    });
  });

  test('calls createProduct when the form is submitted with a new product', async () => {
    (fetchProductList as jest.Mock).mockResolvedValue([]);
    (createProduct as jest.Mock).mockResolvedValue({});
    setup(undefined);
    const mockProduct = {
      id: '122',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'https://example.com/logo.png',
      date_release: '2024-12-12',
      date_revision: '2025-12-12',
    };


    fireEvent.change(screen.getByLabelText(/ID del Producto/i), { target: { value: mockProduct.id } });
    fireEvent.change(screen.getByLabelText(/Nombre del Producto/i), { target: { value: mockProduct.name  } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: mockProduct.description } });
    fireEvent.change(screen.getByLabelText(/URL del Logo/i), { target: { value: mockProduct.logo } });
    fireEvent.change(screen.getByLabelText(/Fecha de Liberación/i), { target: { value:  mockProduct.date_release  } });

    fireEvent.click(screen.getByText(/Agregar/i));

    await waitFor(() => {
      expect(createProduct).toHaveBeenCalledWith(mockProduct);
    });
  });

  test('Error handler - fields no valid', async () => {
    (fetchProductList as jest.Mock).mockResolvedValue([]);
    (createProduct as jest.Mock).mockResolvedValue({});
    setup(undefined);
    const mockProduct = {
      id: '12',
      name: 'asd',
      description: '2da',
      logo: '',
      date_release: '1996-12-12',
      date_revision: '',
    };


    fireEvent.change(screen.getByLabelText(/ID del Producto/i), { target: { value: mockProduct.id } });
    fireEvent.change(screen.getByLabelText(/Nombre del Producto/i), { target: { value: mockProduct.name  } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: mockProduct.description } });
    fireEvent.change(screen.getByLabelText(/URL del Logo/i), { target: { value: mockProduct.logo } });
    fireEvent.change(screen.getByLabelText(/Fecha de Liberación/i), { target: { value:  mockProduct.date_release  } });

    fireEvent.click(screen.getByText(/Agregar/i));

    await waitFor(() => {
      expect(screen.getAllByText("ID no válido!")).toHaveLength(1);
      expect(screen.getAllByText("Nombre no válido!")).toHaveLength(1);
      expect(screen.getAllByText("Descripción no válida!")).toHaveLength(1);
      expect(screen.getAllByText("Fecha de liberación no válida!")).toHaveLength(1);
      expect(screen.getAllByText("Este campo es requerido")).toHaveLength(1);
    });
  });
});
