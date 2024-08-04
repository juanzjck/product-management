import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

describe('Button', () => {
  test('renders primary button and handles click', () => {
    const handleClick = jest.fn();
    render(
      <Button color="primary" onClick={handleClick}>
        Primary Button
      </Button>
    );

    const button = screen.getByText(/Primary Button/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button-primary');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  test('renders secondary button and handles click', () => {
    const handleClick = jest.fn();
    render(
      <Button color="secondary" onClick={handleClick}>
        Secondary Button
      </Button>
    );

    const button = screen.getByText(/Secondary Button/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button-secondary');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
