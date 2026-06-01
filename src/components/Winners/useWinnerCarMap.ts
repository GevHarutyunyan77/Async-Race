import { useEffect, useState } from 'react';
import { fetchCar } from '../../api/garageApi';
import type { Car } from '../../types/car';
import type { Winner } from '../../types/winner';

export const useWinnerCarMap = (winners: Winner[]) => {
  const [carMap, setCarMap] = useState<Record<number, Car>>({});

  useEffect(() => {
    const loadCarDetails = async () => {
      const entries = await Promise.all(
        winners.map(async (winner) => {
          const car = await fetchCar(winner.id);
          return [winner.id, car] as const;
        }),
      );

      const nextMap: Record<number, Car> = {};
      entries.forEach(([id, car]) => {
        if (car) {
          nextMap[id] = car;
        }
      });
      setCarMap(nextMap);
    };

    if (winners.length) {
      loadCarDetails();
    }
  }, [winners]);

  return carMap;
};
