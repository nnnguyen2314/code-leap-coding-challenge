import axios from 'axios';

// Centralized axios instance configured for API calls
const baseURL = process.env.REACT_APP_DOG_API_URL || 'https://api.thedogapi.com/v1';
const apiKey = process.env.REACT_APP_DOG_API_KEY;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    ...(apiKey ? { 'x-api-key': apiKey } : {}),
  },
});

export type Breed = {
  id: number;
  name: string;
  reference_image_id?: string;
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  weight?: { metric?: string };
  height?: { metric?: string };
  image?: { id?: string; url?: string };
};

export type VoteRequest = {
  image_id: string;
  value: -1 | 1 | 2; // dislike | like | super like
};

export async function fetchBreeds(page = 0, limit = 50): Promise<Breed[]> {
  const { data } = await api.get<Breed[]>(`/breeds`, {
    params: { page, limit, attach_breed: 0 },
  });
  return data;
}

export async function fetchBreedImage(breedId: number): Promise<{ id: string; url: string } | undefined> {
  const { data } = await api.get<Array<{ id: string; url: string }>>(`/images/search`, {
    params: { breed_id: breedId, limit: 1, size: 'med' },
  });
  return data?.[0];
}

export async function postVote(body: VoteRequest) {
  const { data } = await api.post(`/votes`, body);
  return data as { id: number };
}
