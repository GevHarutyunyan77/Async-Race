import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetPageRace, startPageRace } from '../../features/race/raceThunks';
import { clearWinner } from '../../features/race/raceSlice';
import { setGaragePage } from '../../features/ui/uiSlice';
import { VIEWS } from '../../constants/app';
import Pagination from '../Pagination/Pagination';
import WinnerBanner from '../WinnerBanner/WinnerBanner';
import GarageFormPanels from './GarageFormPanels';
import RaceControlPanel from './RaceControlPanel';
import GarageCarsList from './GarageCarsList';
import GarageStatus from './GarageStatus';
import { useGarageData } from './useGarageData';

function GarageContent() {
  const dispatch = useAppDispatch();
  const { formError } = useAppSelector((state) => state.ui);
  const { isRaceRunning } = useAppSelector((state) => state.race);
  const garageData = useGarageData();

  return (
    <>
      <div className="panels">
        <GarageFormPanels disabled={isRaceRunning} onSaved={garageData.reloadCars} />
        <RaceControlPanel
          disabled={isRaceRunning}
          hasCars={garageData.cars.length > 0}
          onStartRace={() =>
            dispatch(startPageRace(garageData.cars.map((car) => ({ id: car.id, name: car.name }))))
          }
          onResetRace={() => dispatch(resetPageRace(garageData.cars.map((car) => car.id)))}
          onGenerate={garageData.handleGenerate}
        />
      </div>
      <GarageStatus
        formError={formError}
        totalCount={garageData.totalCount}
        loading={garageData.loading}
      />
      <GarageCarsList
        cars={garageData.cars}
        actionsDisabled={isRaceRunning}
        onDelete={garageData.handleDelete}
      />
      {garageData.totalCount > 0 && (
        <Pagination
          currentPage={garageData.garagePage}
          totalPages={garageData.totalPages}
          onPageChange={(page) => dispatch(setGaragePage(page))}
          disabled={isRaceRunning}
        />
      )}
    </>
  );
}

function GarageView() {
  const dispatch = useAppDispatch();
  const { winnerName } = useAppSelector((state) => state.race);

  return (
    <section className="view garage-view">
      <h1>{VIEWS.GARAGE.toUpperCase()}</h1>
      {winnerName && (
        <WinnerBanner winnerName={winnerName} onClose={() => dispatch(clearWinner())} />
      )}
      <GarageContent />
    </section>
  );
}

export default GarageView;
