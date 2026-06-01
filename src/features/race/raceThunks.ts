import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  calculateAnimationDuration,
  driveEngine,
  startEngine,
  stopEngine,
} from '../../api/engineApi';
import { saveWinnerResult } from '../../api/winnersApi';
import type { RootState } from '../../app/store';
import {
  breakCarEngine,
  clearWinner,
  finishCarDrive,
  resetCarPosition,
  setCarDriving,
  setCarStatus,
  setRaceRunning,
  setRaceStartTime,
  setWinner,
} from './raceSlice';

interface StartEnginePayload {
  carId: number;
  carName: string;
}

interface RaceCarPayload {
  id: number;
  name: string;
}

export const startCarEngine = createAsyncThunk(
  'race/startCarEngine',
  async ({ carId, carName }: StartEnginePayload, { dispatch, getState }) => {
    dispatch(setCarStatus({ carId, status: 'starting' }));

    const engineData = await startEngine(carId);
    const duration = calculateAnimationDuration(engineData.distance, engineData.velocity);
    const startTime = Date.now();

    dispatch(setRaceStartTime({ carId, startTime }));
    dispatch(setCarDriving({ carId, duration }));
    dispatch(setRaceRunning(true));

    const driveResult = await driveEngine(carId);

    if (!driveResult.ok && driveResult.status === 500) {
      dispatch(breakCarEngine(carId));
      return;
    }

    if (driveResult.ok) {
      const state = getState() as RootState;
      const hasWinner = state.race.winnerName !== null;

      if (!hasWinner) {
        const raceTime = (Date.now() - startTime) / 1000;
        await saveWinnerResult(carId, raceTime);
        dispatch(setWinner(carName));
      }

      dispatch(finishCarDrive(carId));
    }
  },
);

export const stopCarEngine = createAsyncThunk(
  'race/stopCarEngine',
  async (carId: number, { dispatch }) => {
    await stopEngine(carId);
    dispatch(resetCarPosition(carId));
  },
);

export const startPageRace = createAsyncThunk(
  'race/startPageRace',
  async (cars: RaceCarPayload[], { dispatch }) => {
    dispatch(setRaceRunning(true));
    dispatch(clearWinner());

    await Promise.all(
      cars.map((car) => dispatch(startCarEngine({ carId: car.id, carName: car.name }))),
    );
  },
);

export const resetPageRace = createAsyncThunk(
  'race/resetPageRace',
  async (carIds: number[], { dispatch }) => {
    await Promise.all(
      carIds.map(async (carId) => {
        try {
          await stopEngine(carId);
        } catch {
          // Engine may already be stopped
        }
        dispatch(resetCarPosition(carId));
      }),
    );

    dispatch(setRaceRunning(false));
    dispatch(clearWinner());
  },
);
