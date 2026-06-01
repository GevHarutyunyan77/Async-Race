import CarIcon from '../CarIcon/CarIcon';
import type { CarRaceState } from '../../types/engine';
import type { Car } from '../../types/car';
import CarControls from './CarControls';

interface CarTrackProps {
  car: Car;
  raceState: CarRaceState;
  isRaceRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onSelect: () => void;
  onDelete: () => void;
  actionsDisabled: boolean;
}

const getLeftPosition = (position: number): string =>
  position === 0 ? '0px' : `calc((100% - 80px) * ${position / 100})`;

function CarTrack({
  car,
  raceState,
  isRaceRunning,
  onStart,
  onStop,
  onSelect,
  onDelete,
  actionsDisabled,
}: CarTrackProps) {
  const isDriving = raceState.status === 'starting' || raceState.status === 'driving';
  const isIdle = raceState.status === 'idle' || raceState.status === 'stopped';
  const transitionStyle = isDriving
    ? { transitionDuration: `${raceState.animationDuration}ms` }
    : { transitionDuration: '0ms' };

  return (
    <div className="car-track">
      <CarControls
        isIdle={isIdle}
        isRaceRunning={isRaceRunning}
        actionsDisabled={actionsDisabled}
        onStart={onStart}
        onStop={onStop}
        onSelect={onSelect}
        onDelete={onDelete}
      />
      <h3 className="car-name">{car.name}</h3>
      <div className="track">
        <div
          className="car-wrapper"
          style={{ left: getLeftPosition(raceState.position), ...transitionStyle }}
        >
          <CarIcon color={car.color} />
        </div>
        <div className="finish-line" />
      </div>
    </div>
  );
}

export default CarTrack;
