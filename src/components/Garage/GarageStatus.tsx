interface GarageStatusProps {
  formError: string | null;
  totalCount: number;
  loading: boolean;
}

function GarageStatus({ formError, totalCount, loading }: GarageStatusProps) {
  return (
    <>
      {formError && <p className="form-error">{formError}</p>}
      <p className="total-count">Total cars: {totalCount}</p>
      {loading && <p>Loading...</p>}
      {!loading && totalCount === 0 && <p className="empty-message">No Cars</p>}
    </>
  );
}

export default GarageStatus;
