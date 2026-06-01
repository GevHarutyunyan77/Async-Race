import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCar, deleteCar, fetchCars, updateCar } from '../../api/garageApi';
import { deleteWinner } from '../../api/winnersApi';
import { CARS_PER_PAGE, RANDOM_CARS_COUNT } from '../../constants/app';
import type { Car } from '../../types/car';
import { generateRandomCarData, validateCarName } from '../../utils/helpers';

interface GarageState {
  cars: Car[];
  totalCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export const loadCars = createAsyncThunk('garage/loadCars', async (page: number) =>
  fetchCars(page),
);

export const addCar = createAsyncThunk(
  'garage/addCar',
  async ({ name, color }: { name: string; color: string }, { rejectWithValue }) => {
    const validationError = validateCarName(name);

    if (validationError) {
      return rejectWithValue(validationError);
    }

    return createCar({ name: name.trim(), color });
  },
);

export const editCar = createAsyncThunk(
  'garage/editCar',
  async ({ id, name, color }: { id: number; name: string; color: string }, { rejectWithValue }) => {
    const validationError = validateCarName(name);

    if (validationError) {
      return rejectWithValue(validationError);
    }

    return updateCar(id, { name: name.trim(), color });
  },
);

export const removeCar = createAsyncThunk('garage/removeCar', async (id: number) => {
  await deleteCar(id);

  try {
    await deleteWinner(id);
  } catch {
    // Winner may not exist
  }

  return id;
});

export const generateRandomCars = createAsyncThunk('garage/generateRandomCars', async () => {
  const promises = Array.from({ length: RANDOM_CARS_COUNT }, () => {
    const { name, color } = generateRandomCarData();
    return createCar({ name, color });
  });

  await Promise.all(promises);
});

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload.cars;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(loadCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load cars';
      })
      .addCase(addCar.fulfilled, (state, action) => {
        const isOnFirstPage = state.cars.length < CARS_PER_PAGE;
        state.totalCount += 1;

        if (isOnFirstPage) {
          state.cars.push(action.payload);
        }
      })
      .addCase(editCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex((car) => car.id === action.payload.id);
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })
      .addCase(removeCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export default garageSlice.reducer;
