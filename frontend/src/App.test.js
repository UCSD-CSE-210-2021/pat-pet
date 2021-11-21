import { render, screen } from '@testing-library/react';
import App from './App';

test('renders mainpage', () => {
  render(<App />);
  // Should be rendered by default
  // const helloMsg = screen.getByText(/mother/);
  // expect(helloMsg).toBeInTheDocument();
  // Nav bar is collapsed

  // Nav bar is extended

});

test('extend and collapse the nav menu', () => {
  render(<App />);

});

test('renders search page', () => {
  // Nav bar is collapsed

  // Nav bar is extended

});

test('renders post page', () => {
  // Nav bar is collapsed

  // Nav bar is extended
});