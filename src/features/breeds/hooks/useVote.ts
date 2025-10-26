import { useMutation } from '@tanstack/react-query';
import { postVote } from '../../../shared/api/client';

export function useVote() {
  return useMutation({
    mutationFn: postVote,
  });
}
