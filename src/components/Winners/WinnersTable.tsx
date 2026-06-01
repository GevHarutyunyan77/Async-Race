import type { Car } from '../../types/car';
import type { Winner } from '../../types/winner';
import { formatRaceTime } from '../../utils/helpers';
import CarIcon from '../CarIcon/CarIcon';

interface WinnersTableHeaderProps {
  sortBy: 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
  disabled: boolean;
  onToggleSort: (field: 'wins' | 'time') => void;
}

const getSortIndicator = (active: boolean, order: 'ASC' | 'DESC'): string => {
  if (!active) {
    return '';
  }

  return order === 'ASC' ? '↑' : '↓';
};

function WinnersTableHeader({
  sortBy,
  sortOrder,
  disabled,
  onToggleSort,
}: WinnersTableHeaderProps) {
  return (
    <thead>
      <tr>
        <th>№</th>
        <th>Car</th>
        <th>Name</th>
        <th>
          <button type="button" onClick={() => onToggleSort('wins')} disabled={disabled}>
            Wins {getSortIndicator(sortBy === 'wins', sortOrder)}
          </button>
        </th>
        <th>
          <button type="button" onClick={() => onToggleSort('time')} disabled={disabled}>
            Best Time (s) {getSortIndicator(sortBy === 'time', sortOrder)}
          </button>
        </th>
      </tr>
    </thead>
  );
}

interface WinnersTableRowProps {
  winner: Winner;
  car?: Car;
  rowNumber: number;
}

function WinnersTableRow({ winner, car, rowNumber }: WinnersTableRowProps) {
  return (
    <tr>
      <td>{rowNumber}</td>
      <td>{car ? <CarIcon color={car.color} /> : '-'}</td>
      <td>{car?.name ?? `Car #${winner.id}`}</td>
      <td>{winner.wins}</td>
      <td>{formatRaceTime(winner.time)}</td>
    </tr>
  );
}

interface WinnersTableProps {
  winners: Winner[];
  carMap: Record<number, Car>;
  rowOffset: number;
  sortBy: 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
  disabled: boolean;
  onToggleSort: (field: 'wins' | 'time') => void;
}

function WinnersTable({
  winners,
  carMap,
  rowOffset,
  sortBy,
  sortOrder,
  disabled,
  onToggleSort,
}: WinnersTableProps) {
  return (
    <table className="winners-table">
      <WinnersTableHeader
        sortBy={sortBy}
        sortOrder={sortOrder}
        disabled={disabled}
        onToggleSort={onToggleSort}
      />
      <tbody>
        {winners.map((winner, index) => (
          <WinnersTableRow
            key={winner.id}
            winner={winner}
            car={carMap[winner.id]}
            rowNumber={rowOffset + index + 1}
          />
        ))}
      </tbody>
    </table>
  );
}

export default WinnersTable;
