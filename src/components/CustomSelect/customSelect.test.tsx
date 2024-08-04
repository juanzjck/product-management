import { render, screen, fireEvent } from '@testing-library/react';
import CustomSelect from './index';
import { Option } from '../../interfaces/ui';
import '@testing-library/jest-dom';

const options: Option[] = [
  { value: 5, label:5 },
  { value: 10, label: 10 },
  { value: 20, label: 20 },
];

describe('CustomSelect', () => {
  test('renders select with options and handles change', () => {
    const handleChange = jest.fn();
    render(<CustomSelect options={options} value="" onChange={handleChange} label="Category" />);

    const select = screen.getAllByLabelText(/Category/i)[0];
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: 20 } });
    expect(handleChange).toHaveBeenCalledWith("20");
  });
});
