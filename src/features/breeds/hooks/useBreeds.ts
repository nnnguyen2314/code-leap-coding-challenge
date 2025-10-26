import { useQuery } from '@tanstack/react-query';
import { Breed, fetchBreedImage, fetchBreeds } from '../../../shared/api/client';

// Fetch a page of breeds and ensure there is an image url on each item
export function useBreeds(page = 0) {
  return useQuery({
    queryKey: ['breeds', page],
    queryFn: async (): Promise<Breed[]> => {
      const breeds = await fetchBreeds(page, 50);
      // resolve missing images
      const withImages = await Promise.all(
        breeds.map(async (b) => {
          if (b.image?.url) return b;
          const img = await fetchBreedImage(b.id);
          return { ...b, image: img ? { id: img.id, url: img.url } : undefined } as Breed;
        }),
      );
      return withImages;
    },
    staleTime: 1000 * 60 * 10,
  });
}
