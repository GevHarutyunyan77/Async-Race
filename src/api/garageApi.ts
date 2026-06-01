import { CARS_PER_PAGE } from '../constants/app';
import type { Car, CarPayload } from '../types/car';
import { apiDelete, apiGet, apiPost, apiPut } from './client';

export const fetchCars = async (page: number): Promise<{ cars: Car[]; totalCount: number }> => {
  const { data, totalCount } = await apiGet<Car[]>(`/garage?_page=${page}&_limit=${CARS_PER_PAGE}`);

  return {
    cars: data,
    totalCount: totalCount ?? data.length,
  };
};

export const createCar = async (payload: CarPayload): Promise<Car> =>
  apiPost<Car>('/garage', payload);

export const updateCar = async (id: number, payload: CarPayload): Promise<Car> =>
  apiPut<Car>(`/garage/${id}`, payload);

export const deleteCar = async (id: number): Promise<void> => apiDelete(`/garage/${id}`);

export const fetchCar = async (id: number): Promise<Car | null> => {
  try {
    return await apiGet<Car>(`/garage/${id}`).then(({ data }) => data);
  } catch {
    return null;
  }
};
