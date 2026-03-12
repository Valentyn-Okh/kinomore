import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteState } from '@/types';

const loadFavoritesFromStorage = (): number[] => {
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: FavoriteState = {
  favoriteIds: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.favoriteIds));
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteIds = state.favoriteIds.filter(id => id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favoriteIds));
    },
    clearFavorites: (state) => {
      state.favoriteIds = [];
      localStorage.removeItem('favorites');
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;