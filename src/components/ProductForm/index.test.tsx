import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductForm from './index';
import { createProduct, verifyProductId as mockVerifyProductId } from '../../services/productService';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

jest.mock('../../services/productService', () => ({
  createProduct: jest.fn(),
  verifyProductId: jest.fn(),
}));

describe('ProductForm', () => {
  beforeEach(() => {
    (mockVerifyProductId as jest.Mock).mockResolvedValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const product = {
    id: 'trc-crd6',
    name: 'Tarjeta de credito',
    description: 'Prueba 1, tiene que ser largo',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2024-12-12',
    date_revision: '2025-12-12'
  };

  test('validates and submits the form successfully', async () => {
    (mockVerifyProductId as jest.Mock).mockResolvedValue(false);
    (createProduct as jest.Mock).mockResolvedValue(product);

    render(<ProductForm />);

    fireEvent.change(screen.getByLabelText(/ID del Producto/i), { target: { value: product.id } });
    fireEvent.change(screen.getByLabelText(/Nombre del Producto/i), { target: { value: product.name } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: product.description } });
    fireEvent.change(screen.getByLabelText(/URL del Logo/i), { target: { value: product.logo } });
    fireEvent.change(screen.getByLabelText(/Fecha de Liberación/i), { target: { value: product.date_release } });

    fireEvent.click(screen.getByText(/Agregar/i));

    await waitFor(() => expect(mockVerifyProductId).toHaveBeenCalledWith(product.id));
    await waitFor(() => expect(createProduct).toHaveBeenCalledWith(product));
  
    expect(screen.getByText(/El producto se creó exitosamente/i)).toBeInTheDocument();
  });

  test('shows validation errors for required fields', async () => {
    render(<ProductForm />);

    fireEvent.click(screen.getByText(/Agregar/i));

    await waitFor(() => {
      expect(screen.getByText(/ID es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/Nombre es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/Descripción es requerida/i)).toBeInTheDocument();
      expect(screen.getByText(/Logo es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/Fecha de liberación es requerida/i)).toBeInTheDocument();
      expect(screen.getByText(/Fecha de revisión no válido!/i)).toBeInTheDocument();
    });
  });

 test('shows validation error for ID length', async () => {
   (mockVerifyProductId as jest.Mock).mockResolvedValue(false);

   render(<ProductForm />);

   fireEvent.change(screen.getByLabelText(/ID del Producto/i), { target: { value: 'ab' } });
   fireEvent.click(screen.getByText(/Agregar/i));

   await waitFor(() => {
     expect(screen.getByText(/ID no válido!/i)).toBeInTheDocument();
   });
 });

  // test('shows validation error for duplicate ID', async () => {
  //   (mockVerifyProductId as jest.Mock).mockResolvedValue(true);

  //   render(<ProductForm />);

  //   fireEvent.change(screen.getByLabelText(/ID del Producto/i), { target: { value: 'duplicate-id' } });
  //   fireEvent.click(screen.getByText(/Agregar/i));

  //   await waitFor(() => {
  //     expect(screen.getByText(/ID ya existe/i)).toBeInTheDocument();
  //   });
  // });

  // test('shows validation error for name length', async () => {
  //   render(<ProductForm />);

  //   fireEvent.change(screen.getByLabelText(/Nombre del Producto/i), { target: { value: 'abcd' } });
  //   fireEvent.click(screen.getByText(/Agregar/i));

  //   await waitFor(() => {
  //     expect(screen.getByText(/Nombre no válido!/i)).toBeInTheDocument();
  //   });
  // });

  // test('shows validation error for description length', async () => {
  //   render(<ProductForm />);

  //   fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'short' } });
  //   fireEvent.click(screen.getByText(/Agregar/i));

  //   await waitFor(() => {
  //     expect(screen.getByText(/Descripción no válido!/i)).toBeInTheDocument();
  //   });
  // });

  // test('shows validation error for release date', async () => {
  //   render(<ProductForm />);

  //   const pastDate = new Date();
  //   pastDate.setFullYear(pastDate.getFullYear() - 1);
  //   const pastDateString = pastDate.toISOString().split('T')[0];

  //   fireEvent.change(screen.getByLabelText(/Fecha de Liberación/i), { target: { value: pastDateString } });
  //   fireEvent.click(screen.getByText(/Agregar/i));

  //   await waitFor(() => {
  //     expect(screen.getByText(/Fecha de liberación no válido!/i)).toBeInTheDocument();
  //   });
  // });

  // test('shows validation error for revision date', async () => {
  //   render(<ProductForm />);

  //   const releaseDate = new Date();
  //   const releaseDateString = releaseDate.toISOString().split('T')[0];
  //   const incorrectRevisionDate = new Date(releaseDate);
  //   incorrectRevisionDate.setFullYear(releaseDate.getFullYear() + 2);
  //   const incorrectRevisionDateString = incorrectRevisionDate.toISOString().split('T')[0];

  //   fireEvent.change(screen.getByLabelText(/Fecha de Liberación/i), { target: { value: releaseDateString } });
  //   fireEvent.change(screen.getByLabelText(/Fecha de Revisión/i), { target: { value: incorrectRevisionDateString } });
  //   fireEvent.click(screen.getByText(/Agregar/i));

  //   await waitFor(() => {
  //     expect(screen.getByText(/Fecha de revisión no válido!/i)).toBeInTheDocument();
  //   });
  // });

  // test('resets the form when clicking the Reiniciar button', async () => {
  //   render(<ProductForm />);

  //   fireEvent.change(screen.getByLabelText(/ID del Producto/i), { target: { value: 'trc-crd6' } });
  //   fireEvent.change(screen.getByLabelText(/Nombre del Producto/i), { target: { value: 'Tarjeta de credito' } });
  //   fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Prueba 1' } });
  //   fireEvent.change(screen.getByLabelText(/URL del Logo/i), { target: { value: 'https://example.com/logo.png' } });
  //   fireEvent.change(screen.getByLabelText(/Fecha de Liberación/i), { target: { value: '2023-02-01' } });

  //   fireEvent.click(screen.getByText(/Reiniciar/i));

  //   await waitFor(() => {
  //     expect(screen.getByLabelText(/ID del Producto/i)).toHaveValue('');
  //     expect(screen.getByLabelText(/Nombre del Producto/i)).toHaveValue('');
  //     expect(screen.getByLabelText(/Descripción/i)).toHaveValue('');
  //     expect(screen.getByLabelText(/URL del Logo/i)).toHaveValue('');
  //     expect(screen.getByLabelText(/Fecha de Liberación/i)).toHaveValue('');
  //     expect(screen.getByLabelText(/Fecha de Revisión/i)).toHaveValue('');
  //   });
  // });
});
