export const CARS_PER_PAGE = 7;
export const WINNERS_PER_PAGE = 10;
export const RANDOM_CARS_COUNT = 100;
export const MAX_CAR_NAME_LENGTH = 25;
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

export const VIEWS = {
  GARAGE: 'garage',
  WINNERS: 'winners',
} as const;

export const ENGINE_STATUS = {
  STARTED: 'started',
  STOPPED: 'stopped',
  DRIVE: 'drive',
} as const;

export const SORT_FIELDS = {
  WINS: 'wins',
  TIME: 'time',
} as const;

export const SORT_ORDERS = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;
