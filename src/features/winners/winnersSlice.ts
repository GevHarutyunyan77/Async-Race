import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWinners } from '../../api/winnersApi';
import type { Winner, WinnerSortField, SortOrder } from '../../types/winner';

interface WinnersState {
  winners: Winner[];
  totalCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
  loading: false,
  error: null,
};

interface LoadWinnersParams {
  page: number;
  sortBy: WinnerSortField;
  sortOrder: SortOrder;
}

export const loadWinners = createAsyncThunk(
  'winners/loadWinners',
  async (params: LoadWinnersParams) => fetchWinners(params),
);

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadWinners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWinners.fulfilled, (state, action) => {
        state.loading = false;
        state.winners = action.payload.winners;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(loadWinners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load winners';
      });
  },
});

export default winnersSlice.reducer;
