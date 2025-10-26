import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppProviders from './shared/providers/AppProviders';

export function appProvidersWrapper(route = '/') {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>
      <AppProviders>{children}</AppProviders>
    </MemoryRouter>
  );
  return Wrapper;
}

export function renderWithProviders(ui: React.ReactElement, { route = '/' } = {}) {
  return render(ui, { wrapper: appProvidersWrapper(route) });
}

export * from '@testing-library/react';
