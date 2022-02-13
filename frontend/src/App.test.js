import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Magic Match game on initial load', () => {
  render(<App />);
  const magicMatchGame = screen.getByRole('heading', {
    name: /magic match/i,
  });

  expect(magicMatchGame).toBeInTheDocument();
});
