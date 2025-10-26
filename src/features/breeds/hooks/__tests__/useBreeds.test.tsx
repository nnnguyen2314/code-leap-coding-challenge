import React from 'react';
import { renderWithProviders, screen, waitFor } from '../../../../test-utils';
import { useBreeds } from '../useBreeds';

jest.mock('../../../../shared/api/client', () => ({
  fetchBreeds: jest.fn(),
  fetchBreedImage: jest.fn(),
}));

const { fetchBreeds, fetchBreedImage } = jest.requireMock('../../../../shared/api/client') as {
  fetchBreeds: jest.Mock;
  fetchBreedImage: jest.Mock;
};

function TestCmp() {
  const { data = [], isLoading } = useBreeds(0);
  if (isLoading) return <div>Loading</div>;
  return (
    <ul>
      {data.map((b) => (
        <li key={b.id}>{b.name}-{b.image?.url || 'noimg'}</li>
      ))}
    </ul>
  );
}

describe('useBreeds hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches breeds and backfills missing images', async () => {
    fetchBreeds.mockResolvedValue([
      { id: 1, name: 'A', image: { id: 'x', url: 'http://img/a.jpg' } },
      { id: 2, name: 'B' },
    ]);
    fetchBreedImage.mockResolvedValue({ id: 'y', url: 'http://img/b.jpg' });

    renderWithProviders(<TestCmp />);

    await waitFor(() => {
      expect(screen.getByText('A-http://img/a.jpg')).toBeInTheDocument();
      expect(screen.getByText('B-http://img/b.jpg')).toBeInTheDocument();
    });

    expect(fetchBreeds).toHaveBeenCalledWith(0, 50);
    expect(fetchBreedImage).toHaveBeenCalledWith(2);
  });
});
