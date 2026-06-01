import CreateCarPanel from './CreateCarPanel';
import UpdateCarPanel from './UpdateCarPanel';

interface GarageFormPanelsProps {
  disabled: boolean;
  onSaved: () => void;
}

function GarageFormPanels({ disabled, onSaved }: GarageFormPanelsProps) {
  return (
    <>
      <CreateCarPanel disabled={disabled} onSaved={onSaved} />
      <UpdateCarPanel disabled={disabled} onSaved={onSaved} />
    </>
  );
}

export default GarageFormPanels;
