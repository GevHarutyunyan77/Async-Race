import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCar } from '../../features/garage/garageSlice';
import {
  clearCreateForm,
  setCreateColor,
  setCreateName,
  setFormError,
} from '../../features/ui/uiSlice';

interface CreateCarPanelProps {
  disabled: boolean;
  onSaved: () => void;
}

function CreateCarPanel({ disabled, onSaved }: CreateCarPanelProps) {
  const dispatch = useAppDispatch();
  const { createName, createColor } = useAppSelector((state) => state.ui);

  const handleCreate = async () => {
    const result = await dispatch(addCar({ name: createName, color: createColor }));

    if (addCar.rejected.match(result)) {
      dispatch(setFormError(result.payload as string));
      return;
    }

    dispatch(clearCreateForm());
    onSaved();
  };

  return (
    <div className="panel">
      <h2>Create Car</h2>
      <input
        type="text"
        value={createName}
        placeholder="Name"
        disabled={disabled}
        onChange={(event) => dispatch(setCreateName(event.target.value))}
      />
      <input
        type="color"
        value={createColor}
        disabled={disabled}
        onChange={(event) => dispatch(setCreateColor(event.target.value))}
      />
      <button type="button" onClick={handleCreate} disabled={disabled}>
        Create
      </button>
    </div>
  );
}

export default CreateCarPanel;
