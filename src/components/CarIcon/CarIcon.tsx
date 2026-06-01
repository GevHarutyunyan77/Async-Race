interface CarIconProps {
  color: string;
}

function CarIcon({ color }: CarIconProps) {
  return (
    <svg className="car-icon" viewBox="0 0 80 40" aria-hidden="true">
      <rect x="8" y="16" width="64" height="16" rx="4" fill={color} />
      <rect x="20" y="8" width="36" height="14" rx="3" fill={color} />
      <circle cx="22" cy="32" r="6" fill="#222" />
      <circle cx="58" cy="32" r="6" fill="#222" />
    </svg>
  );
}

export default CarIcon;
