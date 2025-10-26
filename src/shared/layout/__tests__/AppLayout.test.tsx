import React from 'react';
import { renderWithProviders, screen } from '../../../test-utils';
import AppLayout from '../AppLayout';

describe('AppLayout', () => {
  it('renders children', () => {
    renderWithProviders(
      <AppLayout>
        <div>Child content</div>
      </AppLayout>,
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
