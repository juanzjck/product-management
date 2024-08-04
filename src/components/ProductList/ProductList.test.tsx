import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './index';
import { fetchProductList as mockFetchProductList } from '../../services/productService';
import '@testing-library/jest-dom';
import { act } from 'react';

jest.mock('../../services/productService', () => ({
  fetchProductList: jest.fn(),
}));

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

const products = [
  { logo: 'JG', name: 'Producto 1', description: 'Descripción 1', date_release: '2023-02-01T00:00:00.000+00:00', date_revision: '2023-02-03T00:00:00.000+00:00' },
  { logo: 'JG', name: 'Producto 2', description: 'Descripción 2', date_release: '2023-02-01T00:00:00.000+00:00', date_revision: '2023-02-03T00:00:00.000+00:00' },
];

describe('ProductList', () => {
  beforeEach(() => {

    (mockFetchProductList as jest.Mock).mockResolvedValue(products);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders ProductList with loading skeleton and then product data', async () => {
    await act(async () => {
      render(<ProductList />);
    });

    // add test for the skeleton loader

    await waitFor(() => expect(mockFetchProductList).toHaveBeenCalled());

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getAllByText('01/02/2023')).toHaveLength(2);
      expect(screen.getAllByText('03/02/2023')).toHaveLength(2);
    });
  });
});
