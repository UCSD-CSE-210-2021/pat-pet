import { render, screen } from '@testing-library/react';
import Homepage from './index';

test('smoke test on homepage', () => {
    render(<Homepage />);
    const helloMsg = screen.getByText(/hello/i);
    expect(helloMsg).toBeInTheDocument();
  });