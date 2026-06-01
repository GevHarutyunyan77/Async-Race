import { ENGINE_STATUS } from '../constants/app';
import type { DriveResponse, EngineResponse } from '../types/engine';
import { apiPatch, apiPatchSafe } from './client';

export const startEngine = async (id: number): Promise<EngineResponse> =>
  apiPatch<EngineResponse>(`/engine?id=${id}&status=${ENGINE_STATUS.STARTED}`);

export const stopEngine = async (id: number): Promise<EngineResponse> =>
  apiPatch<EngineResponse>(`/engine?id=${id}&status=${ENGINE_STATUS.STOPPED}`);

export const driveEngine = async (
  id: number,
): Promise<{ ok: true; data: DriveResponse } | { ok: false; status: number }> =>
  apiPatchSafe<DriveResponse>(`/engine?id=${id}&status=${ENGINE_STATUS.DRIVE}`);

export const calculateAnimationDuration = (distance: number, velocity: number): number =>
  Math.round(distance / velocity);
