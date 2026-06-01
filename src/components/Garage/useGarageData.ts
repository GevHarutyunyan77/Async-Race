import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadCars, removeCar, generateRandomCars } from '../../features/garage/garageSlice';
import { setGaragePage } from '../../features/ui/uiSlice';
import { CARS_PER_PAGE } from '../../constants/app';
import { calculateTotalPages } from '../../utils/helpers';

export const useGarageData = () => {
  const dispatch = useAppDispatch();
  const { cars, totalCount, loading } = useAppSelector((state) => state.garage);
  const { garagePage } = useAppSelector((state) => state.ui);

  const reloadCars = useCallback(() => {
    dispatch(loadCars(garagePage));
  }, [dispatch, garagePage]);

  useEffect(() => {
    reloadCars();
  }, [reloadCars]);

  const handleDelete = async (id: number) => {
    await dispatch(removeCar(id));
    const newTotalPages = calculateTotalPages(totalCount - 1, CARS_PER_PAGE);

    if (garagePage > newTotalPages) {
      dispatch(setGaragePage(newTotalPages));
      return;
    }

    reloadCars();
  };

  const handleGenerate = async () => {
    await dispatch(generateRandomCars());
    dispatch(setGaragePage(1));
    dispatch(loadCars(1));
  };

  return {
    cars,
    totalCount,
    loading,
    garagePage,
    totalPages: calculateTotalPages(totalCount, CARS_PER_PAGE),
    reloadCars,
    handleDelete,
    handleGenerate,
  };
};
