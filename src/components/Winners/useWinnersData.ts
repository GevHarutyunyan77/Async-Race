import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadWinners } from '../../features/winners/winnersSlice';
import { setWinnersPage, setWinnersSort } from '../../features/ui/uiSlice';
import { WINNERS_PER_PAGE } from '../../constants/app';
import { calculateTotalPages } from '../../utils/helpers';
import { useWinnerCarMap } from './useWinnerCarMap';

export const useWinnersData = () => {
  const dispatch = useAppDispatch();
  const { winners, totalCount, loading } = useAppSelector((state) => state.winners);
  const { winnersPage, winnersSortBy, winnersSortOrder } = useAppSelector((state) => state.ui);
  const carMap = useWinnerCarMap(winners);

  const reloadWinners = useCallback(() => {
    dispatch(
      loadWinners({ page: winnersPage, sortBy: winnersSortBy, sortOrder: winnersSortOrder }),
    );
  }, [dispatch, winnersPage, winnersSortBy, winnersSortOrder]);

  useEffect(() => {
    reloadWinners();
  }, [reloadWinners]);

  const toggleSort = (field: 'wins' | 'time') => {
    const isSameField = winnersSortBy === field;
    const nextOrder = isSameField && winnersSortOrder === 'DESC' ? 'ASC' : 'DESC';
    dispatch(setWinnersSort({ sortBy: field, sortOrder: nextOrder }));
  };

  return {
    winners,
    totalCount,
    loading,
    winnersPage,
    winnersSortBy,
    winnersSortOrder,
    carMap,
    totalPages: calculateTotalPages(totalCount, WINNERS_PER_PAGE),
    rowOffset: (winnersPage - 1) * WINNERS_PER_PAGE,
    toggleSort,
    setPage: (page: number) => dispatch(setWinnersPage(page)),
  };
};
