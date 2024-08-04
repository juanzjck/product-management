import { render, screen } from '@testing-library/react';
import ProductTable from './index';
import { Product } from '../../interfaces/Product';

const products: Product[] = [
  { logo: 'JG', name: 'Nombre del producto', description: 'Descripción', date_release: '01/01/2000', date_revision: '01/01/2001' }
];

test('renders product table with products', () => {
  render(<ProductTable products={products} />);
  const rows = screen.getAllByRole('row');
  expect(rows.length).toBe(products.length + 1);
});
