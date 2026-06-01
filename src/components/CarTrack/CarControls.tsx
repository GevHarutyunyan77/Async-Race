interface CarControlsProps {
  isIdle: boolean;
  isRaceRunning: boolean;
  actionsDisabled: boolean;
  onStart: () => void;
  onStop: () => void;
  onSelect: () => void;
  onDelete: () => void;
}

function CarControls({
  isIdle,
  isRaceRunning,
  actionsDisabled,
  onStart,
  onStop,
  onSelect,
  onDelete,
}: CarControlsProps) {
  return (
    <div className="car-controls">
      <button type="button" onClick={onStart} disabled={!isIdle || isRaceRunning}>
        A
      </button>
      <button type="button" onClick={onStop} disabled={isIdle}>
        B
      </button>
      <button type="button" onClick={onSelect} disabled={actionsDisabled}>
        S
      </button>
      <button type="button" onClick={onDelete} disabled={actionsDisabled}>
        D
      </button>
    </div>
  );
}

export default CarControls;
