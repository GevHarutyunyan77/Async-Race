import { WINNERS_PER_PAGE } from '../constants/app';
import type {
  CreateWinnerPayload,
  SortOrder,
  Winner,
  WinnerPayload,
  WinnerSortField,
} from '../types/winner';
import { apiDelete, apiGet, apiPost, apiPut } from './client';

interface FetchWinnersParams {
  page: number;
  sortBy: WinnerSortField;
  sortOrder: SortOrder;
}

export const fetchWinners = async ({
  page,
  sortBy,
  sortOrder,
}: FetchWinnersParams): Promise<{ winners: Winner[]; totalCount: number }> => {
  const query = `_page=${page}&_limit=${WINNERS_PER_PAGE}&_sort=${sortBy}&_order=${sortOrder}`;
  const { data, totalCount } = await apiGet<Winner[]>(`/winners?${query}`);

  return {
    winners: data,
    totalCount: totalCount ?? data.length,
  };
};

export const fetchWinner = async (id: number): Promise<Winner | null> => {
  try {
    const { data } = await apiGet<Winner>(`/winners/${id}`);
    return data;
  } catch {
    return null;
  }
};

export const createWinner = async (payload: CreateWinnerPayload): Promise<Winner> =>
  apiPost<Winner>('/winners', payload);

export const updateWinner = async (id: number, payload: WinnerPayload): Promise<Winner> =>
  apiPut<Winner>(`/winners/${id}`, payload);

export const deleteWinner = async (id: number): Promise<void> => apiDelete(`/winners/${id}`);

export const saveWinnerResult = async (id: number, raceTime: number): Promise<void> => {
  const existing = await fetchWinner(id);

  if (existing) {
    await updateWinner(id, {
      wins: existing.wins + 1,
      time: Math.min(existing.time, raceTime),
    });
    return;
  }

  await createWinner({ id, wins: 1, time: raceTime });
};
