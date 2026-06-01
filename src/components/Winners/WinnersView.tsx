import { useAppSelector } from '../../app/hooks';
import { VIEWS } from '../../constants/app';
import Pagination from '../Pagination/Pagination';
import WinnersTable from './WinnersTable';
import { useWinnersData } from './useWinnersData';

function WinnersView() {
  const isRaceRunning = useAppSelector((state) => state.race.isRaceRunning);
  const winnersData = useWinnersData();

  return (
    <section className="view winners-view">
      <h1>{VIEWS.WINNERS.toUpperCase()}</h1>

      {winnersData.loading && <p>Loading...</p>}
      {!winnersData.loading && winnersData.totalCount === 0 && (
        <p className="empty-message">No Winners Yet</p>
      )}

      {winnersData.totalCount > 0 && (
        <>
          <WinnersTable
            winners={winnersData.winners}
            carMap={winnersData.carMap}
            rowOffset={winnersData.rowOffset}
            sortBy={winnersData.winnersSortBy}
            sortOrder={winnersData.winnersSortOrder}
            disabled={isRaceRunning}
            onToggleSort={winnersData.toggleSort}
          />
          <Pagination
            currentPage={winnersData.winnersPage}
            totalPages={winnersData.totalPages}
            onPageChange={winnersData.setPage}
            disabled={isRaceRunning}
          />
        </>
      )}
    </section>
  );
}

export default WinnersView;
