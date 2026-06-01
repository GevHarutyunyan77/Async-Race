export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerPayload {
  wins: number;
  time: number;
}

export interface CreateWinnerPayload extends WinnerPayload {
  id: number;
}

export type WinnerSortField = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';
