import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CarRaceState } from '../../types/engine';

interface RaceState {
  cars: Record<number, CarRaceState>;
  isRaceRunning: boolean;
  winnerName: string | null;
  startTimes: Record<number, number>;
}

export const createIdleCarState = (): CarRaceState => ({
  status: 'idle',
  position: 0,
  animationDuration: 0,
});

const initialState: RaceState = {
  cars: {},
  isRaceRunning: false,
  winnerName: null,
  startTimes: {},
};

export const getCarState = (state: RaceState, carId: number): CarRaceState =>
  state.cars[carId] ?? createIdleCarState();

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    setCarStatus: (
      state,
      action: PayloadAction<{ carId: number; status: CarRaceState['status'] }>,
    ) => {
      const current = getCarState(state, action.payload.carId);
      state.cars[action.payload.carId] = {
        ...current,
        status: action.payload.status,
      };
    },
    setCarDriving: (state, action: PayloadAction<{ carId: number; duration: number }>) => {
      state.cars[action.payload.carId] = {
        status: 'driving',
        position: 100,
        animationDuration: action.payload.duration,
      };
    },
    breakCarEngine: (state, action: PayloadAction<number>) => {
      state.cars[action.payload] = createIdleCarState();
    },
    finishCarDrive: (state, action: PayloadAction<number>) => {
      const current = getCarState(state, action.payload);
      state.cars[action.payload] = {
        ...current,
        status: 'idle',
        position: 100,
      };
    },
    resetCarPosition: (state, action: PayloadAction<number>) => {
      state.cars[action.payload] = createIdleCarState();
      delete state.startTimes[action.payload];
    },
    setRaceStartTime: (state, action: PayloadAction<{ carId: number; startTime: number }>) => {
      state.startTimes[action.payload.carId] = action.payload.startTime;
    },
    setRaceRunning: (state, action: PayloadAction<boolean>) => {
      state.isRaceRunning = action.payload;
    },
    setWinner: (state, action: PayloadAction<string>) => {
      state.winnerName = action.payload;
    },
    clearWinner: (state) => {
      state.winnerName = null;
    },
    resetAllRaceState: (state) => {
      state.cars = {};
      state.isRaceRunning = false;
      state.winnerName = null;
      state.startTimes = {};
    },
  },
});

export const {
  setCarStatus,
  setCarDriving,
  breakCarEngine,
  finishCarDrive,
  resetCarPosition,
  setRaceStartTime,
  setRaceRunning,
  setWinner,
  clearWinner,
  resetAllRaceState,
} = raceSlice.actions;

export default raceSlice.reducer;
