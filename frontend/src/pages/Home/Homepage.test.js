import { render, screen } from '@testing-library/react';
import Homepage from './index';

test('smoke test on homepage. should show My Pets as greeting.', () => {
    render(<Homepage />);
    const helloMsg = screen.getByText(/My Pets/i);
    expect(helloMsg).toBeInTheDocument();
  });