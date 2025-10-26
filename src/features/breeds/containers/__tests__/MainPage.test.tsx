import React from 'react';
import { renderWithProviders, screen, fireEvent } from '../../../../test-utils';
import MainPage from '../MainPage';

jest.mock('../../hooks/useBreeds', () => ({
  useBreeds: jest.fn(),
}));

jest.mock('../../hooks/useVote', () => ({
  useVote: jest.fn(),
}));

const { useBreeds } = jest.requireMock('../../hooks/useBreeds') as { useBreeds: jest.Mock };
const { useVote } = jest.requireMock('../../hooks/useVote') as { useVote: jest.Mock };

describe('MainPage container', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    useBreeds.mockReturnValue({ data: [], isLoading: true, isError: false });
    renderWithProviders(<MainPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    useBreeds.mockReturnValue({ data: [], isLoading: false, isError: true });
    renderWithProviders(<MainPage />);
    expect(screen.getByText('Failed to load breeds.')).toBeInTheDocument();
  });

  it('renders current breed and handles vote advancing', () => {
    const breed = { id: 1, name: 'Bulldog', image: { id: 'img1', url: 'http://example.com' } };
    useBreeds.mockReturnValue({ data: [breed], isLoading: false, isError: false });
    const mutate = jest.fn();
    useVote.mockReturnValue({ mutate });

    renderWithProviders(<MainPage />);

    // Should render the BreedCard content
    expect(screen.getByText('Bulldog')).toBeInTheDocument();

    // Click like button (✅)
    const likeBtn = screen.getByRole('button', { name: 'like' });
    fireEvent.click(likeBtn);

    // Expects vote mutation called
    expect(mutate).toHaveBeenCalledWith({ image_id: 'img1', value: 1 });

    // After dispatching advance, there is no more breeds
    expect(screen.getByText('No more breeds.')).toBeInTheDocument();
  });
});
