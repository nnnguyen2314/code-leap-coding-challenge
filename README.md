# DogFinder

An intuitive, swipe-based web app to explore dog breeds using TheDogAPI. Pick your next best friend by liking, disliking, or super-liking breeds and viewing detailed information.

## Quick Start

1. Copy `.env.example` to `.env` and adjust if needed. We already include a public demo API key for convenience.
2. Install dependencies: `npm install`
3. Run the app: `npm start`
4. Run unit tests: `npm test`
5. Run e2e tests (in another terminal with dev server running): `npm run e2e`

## Tech Choices

- React + TypeScript (CRA baseline)
- React Router for routing between Main and Details pages
- Redux Toolkit + redux-thunk for global UI state (swiping progress and preferences) with localStorage persistence
- TanStack React Query for data fetching/caching from TheDogAPI
- Axios for HTTP client with x-api-key header
- ESLint + Prettier + Husky + lint-staged for consistent code style
- Testing: React Testing Library/Jest for unit, Playwright for e2e

## Architecture (feature-first)

- `src/features/breeds` contains breed-related components, hooks, containers, store
- `src/shared` contains common API client, layout, providers, redux store

## Environment

Configure API in `.env`:

```
REACT_APP_DOG_API_URL=https://api.thedogapi.com/v1
REACT_APP_DOG_API_KEY=your_key_here
```

A default `.env` is included with the provided public key for easy demo.

## How it works

- Main Page loads a page of breeds with images. You can:
  - Swipe left or click ❌ to dislike (sends vote value -1)
  - Swipe right or click ✅ to like (sends vote value 1)
  - Swipe up or click ⭐ to super like (sends vote value 2)
  - Click the card to open the Details page
- Progress is saved to localStorage so reloading continues from the next breed
- Details Page shows: weight.metric, height.metric, name, bred_for, breed_group, life_span, temperament

## Sources

- TheDogAPI docs: https://docs.thedogapi.com/reference

> Note: This project follows best practices but remains intentionally minimal to fit the challenge scope.
