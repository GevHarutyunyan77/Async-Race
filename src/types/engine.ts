export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface DriveResponse {
  success: boolean;
}

export type EngineStatus = 'started' | 'stopped' | 'drive';

export type CarRaceStatus = 'idle' | 'starting' | 'driving' | 'stopped' | 'broken';

export interface CarRaceState {
  status: CarRaceStatus;
  position: number;
  animationDuration: number;
}
