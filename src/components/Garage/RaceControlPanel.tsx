interface RaceControlPanelProps {
  disabled: boolean;
  hasCars: boolean;
  onStartRace: () => void;
  onResetRace: () => void;
  onGenerate: () => void;
}

function RaceControlPanel({
  disabled,
  hasCars,
  onStartRace,
  onResetRace,
  onGenerate,
}: RaceControlPanelProps) {
  return (
    <div className="panel race-panel">
      <button type="button" onClick={onStartRace} disabled={disabled || !hasCars}>
        Start Race
      </button>
      <button type="button" onClick={onResetRace}>
        Reset Race
      </button>
      <button type="button" onClick={onGenerate} disabled={disabled}>
        Generate 100 Cars
      </button>
    </div>
  );
}

export default RaceControlPanel;
