import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { editCar } from '../../features/garage/garageSlice';
import { clearEditForm, setEditColor, setEditName, setFormError } from '../../features/ui/uiSlice';

interface UpdateCarPanelProps {
  disabled: boolean;
  onSaved: () => void;
}

function UpdateCarPanel({ disabled, onSaved }: UpdateCarPanelProps) {
  const dispatch = useAppDispatch();
  const { editCarId, editName, editColor } = useAppSelector((state) => state.ui);

  const handleUpdate = async () => {
    if (editCarId === null) {
      return;
    }

    const result = await dispatch(editCar({ id: editCarId, name: editName, color: editColor }));

    if (editCar.rejected.match(result)) {
      dispatch(setFormError(result.payload as string));
      return;
    }

    dispatch(clearEditForm());
    onSaved();
  };

  return (
    <div className="panel">
      <h2>Update Car</h2>
      <input
        type="text"
        value={editName}
        placeholder="Name"
        disabled={disabled || editCarId === null}
        onChange={(event) => dispatch(setEditName(event.target.value))}
      />
      <input
        type="color"
        value={editColor}
        disabled={disabled || editCarId === null}
        onChange={(event) => dispatch(setEditColor(event.target.value))}
      />
      <button type="button" onClick={handleUpdate} disabled={disabled || editCarId === null}>
        Update
      </button>
    </div>
  );
}

export default UpdateCarPanel;
