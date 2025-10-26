import React from 'react';
import { renderWithProviders, screen, fireEvent } from '../../../../test-utils';
import { BreedCard } from '../BreedCard';

const breed = {
  id: 1,
  name: 'Bulldog',
  bred_for: 'Companionship',
  image: { id: 'img1', url: 'http://example.com/dog.jpg' },
};

describe('BreedCard', () => {
  it('renders name and optional subtitle', () => {
    renderWithProviders(<BreedCard breed={breed as any} />);
    expect(screen.getByText('Bulldog')).toBeInTheDocument();
    expect(screen.getByText('Companionship')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    renderWithProviders(<BreedCard breed={breed as any} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
