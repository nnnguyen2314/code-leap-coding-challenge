import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Preference = 'like' | 'dislike' | 'super';

export type ProgressState = {
  currentIndex: number; // index within the loaded breeds array
  votes: Record<number, Preference>; // breedId -> preference
  lastImageIdByBreed: Record<number, string | undefined>;
};

const STORAGE_KEY = 'dogfinder_progress_v1';

function loadState(): ProgressState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as ProgressState;
  } catch {
    return undefined;
  }
}

function saveState(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore write errors (e.g., storage disabled or quota exceeded)
  }
}

const initialState: ProgressState =
  loadState() || {
    currentIndex: 0,
    votes: {},
    lastImageIdByBreed: {},
  };

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    advance(state) {
      state.currentIndex += 1;
      saveState(state);
    },
    setIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
      saveState(state);
    },
    setVote(
      state,
      action: PayloadAction<{ breedId: number; pref: Preference; imageId?: string }>,
    ) {
      const { breedId, pref, imageId } = action.payload;
      state.votes[breedId] = pref;
      if (imageId) state.lastImageIdByBreed[breedId] = imageId;
      saveState(state);
    },
    reset(state) {
      state.currentIndex = 0;
      state.votes = {};
      state.lastImageIdByBreed = {};
      saveState(state);
    },
  },
});

export const { advance, setIndex, setVote, reset } = progressSlice.actions;
export default progressSlice.reducer;
