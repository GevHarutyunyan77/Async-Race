import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { VIEWS } from '../../constants/app';
import type { SortOrder, WinnerSortField } from '../../types/winner';

export type AppView = typeof VIEWS.GARAGE | typeof VIEWS.WINNERS;

interface UiState {
  activeView: AppView;
  createName: string;
  createColor: string;
  editCarId: number | null;
  editName: string;
  editColor: string;
  garagePage: number;
  winnersPage: number;
  winnersSortBy: WinnerSortField;
  winnersSortOrder: SortOrder;
  formError: string | null;
}

const initialState: UiState = {
  activeView: VIEWS.GARAGE,
  createName: '',
  createColor: '#ffffff',
  editCarId: null,
  editName: '',
  editColor: '#ffffff',
  garagePage: 1,
  winnersPage: 1,
  winnersSortBy: 'wins',
  winnersSortOrder: 'DESC',
  formError: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveView: (state, action: PayloadAction<AppView>) => {
      state.activeView = action.payload;
    },
    setCreateName: (state, action: PayloadAction<string>) => {
      state.createName = action.payload;
    },
    setCreateColor: (state, action: PayloadAction<string>) => {
      state.createColor = action.payload;
    },
    setEditCarId: (state, action: PayloadAction<number | null>) => {
      state.editCarId = action.payload;
    },
    setEditName: (state, action: PayloadAction<string>) => {
      state.editName = action.payload;
    },
    setEditColor: (state, action: PayloadAction<string>) => {
      state.editColor = action.payload;
    },
    setGaragePage: (state, action: PayloadAction<number>) => {
      state.garagePage = action.payload;
    },
    setWinnersPage: (state, action: PayloadAction<number>) => {
      state.winnersPage = action.payload;
    },
    setWinnersSort: (
      state,
      action: PayloadAction<{ sortBy: WinnerSortField; sortOrder: SortOrder }>,
    ) => {
      state.winnersSortBy = action.payload.sortBy;
      state.winnersSortOrder = action.payload.sortOrder;
      state.winnersPage = 1;
    },
    setFormError: (state, action: PayloadAction<string | null>) => {
      state.formError = action.payload;
    },
    loadCarForEdit: (state, action: PayloadAction<{ id: number; name: string; color: string }>) => {
      state.editCarId = action.payload.id;
      state.editName = action.payload.name;
      state.editColor = action.payload.color;
    },
    clearCreateForm: (state) => {
      state.createName = '';
      state.createColor = '#ffffff';
      state.formError = null;
    },
    clearEditForm: (state) => {
      state.editCarId = null;
      state.editName = '';
      state.editColor = '#ffffff';
      state.formError = null;
    },
  },
});

export const {
  setActiveView,
  setCreateName,
  setCreateColor,
  setEditCarId,
  setEditName,
  setEditColor,
  setGaragePage,
  setWinnersPage,
  setWinnersSort,
  setFormError,
  loadCarForEdit,
  clearCreateForm,
  clearEditForm,
} = uiSlice.actions;

export default uiSlice.reducer;
