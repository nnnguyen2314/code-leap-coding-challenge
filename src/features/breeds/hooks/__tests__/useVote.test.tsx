import React from 'react';
import { renderWithProviders, screen, fireEvent, waitFor } from '../../../../test-utils';
import { useVote } from '../useVote';

jest.mock('../../../../shared/api/client', () => ({
  postVote: jest.fn(),
}));

const { postVote } = jest.requireMock('../../../../shared/api/client') as { postVote: jest.Mock };

function TestCmp() {
  const vote = useVote();
  return (
    <button onClick={() => vote.mutate({ image_id: 'img1', value: 2 })}>
      Send
    </button>
  );
}

describe('useVote hook', () => {
  it('calls postVote on mutate', async () => {
    postVote.mockResolvedValue({ id: 123 });

    renderWithProviders(<TestCmp />);
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => expect(postVote).toHaveBeenCalledWith({ image_id: 'img1', value: 2 }));
  });
});
