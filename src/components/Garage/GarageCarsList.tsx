import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadCarForEdit } from '../../features/ui/uiSlice';
import { startCarEngine, stopCarEngine } from '../../features/race/raceThunks';
import type { Car } from '../../types/car';
import CarTrack from '../CarTrack/CarTrack';

interface GarageCarsListProps {
  cars: Car[];
  actionsDisabled: boolean;
  onDelete: (id: number) => void;
}

function GarageCarsList({ cars, actionsDisabled, onDelete }: GarageCarsListProps) {
  const dispatch = useAppDispatch();
  const { cars: raceCars, isRaceRunning } = useAppSelector((state) => state.race);

  return (
    <div className="cars-list">
      {cars.map((car) => (
        <CarTrack
          key={car.id}
          car={car}
          raceState={raceCars[car.id] ?? { status: 'idle', position: 0, animationDuration: 0 }}
          isRaceRunning={isRaceRunning}
          onStart={() => dispatch(startCarEngine({ carId: car.id, carName: car.name }))}
          onStop={() => dispatch(stopCarEngine(car.id))}
          onSelect={() =>
            dispatch(loadCarForEdit({ id: car.id, name: car.name, color: car.color }))
          }
          onDelete={() => onDelete(car.id)}
          actionsDisabled={actionsDisabled}
        />
      ))}
    </div>
  );
}

export default GarageCarsList;
