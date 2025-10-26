import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import AppProviders from './shared/providers/AppProviders';

test('renders initial loading state', () => {
  render(
    <AppProviders>
      <App />
    </AppProviders>
  );
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});
