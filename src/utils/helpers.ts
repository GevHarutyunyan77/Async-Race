import { MAX_CAR_NAME_LENGTH } from '../constants/app';

export const validateCarName = (name: string): string | null => {
  const trimmed = name.trim();

  if (!trimmed) {
    return 'Car name cannot be empty';
  }

  if (trimmed.length > MAX_CAR_NAME_LENGTH) {
    return `Car name must be at most ${MAX_CAR_NAME_LENGTH} characters`;
  }

  return null;
};

export const getRandomHexColor = (): string => {
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0');
  return `#${hex}`;
};

const BRAND_NAMES = [
  'Tesla',
  'Ford',
  'BMW',
  'Audi',
  'Toyota',
  'Honda',
  'Mercedes',
  'Porsche',
  'Nissan',
  'Volvo',
  'Mazda',
  'Kia',
  'Chevrolet',
  'Hyundai',
];

const MODEL_NAMES = [
  'Model S',
  'Mustang',
  'X5',
  'A4',
  'Camry',
  'Civic',
  'C-Class',
  '911',
  'GT-R',
  'XC90',
  'MX-5',
  'Stinger',
  'Corvette',
  'Ioniq',
];

const pickRandom = (items: string[]): string => items[Math.floor(Math.random() * items.length)];

export const generateRandomCarData = (): { name: string; color: string } => ({
  name: `${pickRandom(BRAND_NAMES)} ${pickRandom(MODEL_NAMES)}`,
  color: getRandomHexColor(),
});

export const calculateTotalPages = (totalCount: number, perPage: number): number =>
  Math.max(1, Math.ceil(totalCount / perPage));

export const formatRaceTime = (time: number): string => time.toFixed(2);
