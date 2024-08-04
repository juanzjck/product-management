import { render, screen, fireEvent } from '@testing-library/react';
import ProductSearch from './index';

test('renders search input and allows typing', () => {
  const setSearchTerm = jest.fn();
  render(<ProductSearch searchTerm="" setSearchTerm={setSearchTerm} />);
  const input = screen.getByPlaceholderText(/Search.../i);
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 'test' } });
  expect(setSearchTerm).toHaveBeenCalledWith('test');
});
