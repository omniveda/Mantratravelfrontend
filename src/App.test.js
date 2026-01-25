import { render, screen } from '@testing-library/react';
import App from './App';

import { MemoryRouter } from 'react-router-dom';

test('renders app component', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  // App uses Suspense, so we might see "Loading..." initially
  const loadingElement = screen.getByText(/loading.../i);
  expect(loadingElement).toBeInTheDocument();
});
