import { render, screen } from '@testing-library/react';
import PostPage from './index';

test('smoke test on post page', () => {
    render(<PostPage />);
    const postMsg = screen.getByText(/post/i);
    expect(postMsg).toBeInTheDocument();
  });