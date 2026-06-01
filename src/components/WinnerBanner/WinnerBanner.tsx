interface WinnerBannerProps {
  winnerName: string;
  onClose: () => void;
}

function WinnerBanner({ winnerName, onClose }: WinnerBannerProps) {
  return (
    <div className="winner-banner" role="alert">
      <p>🏆 {winnerName} wins the race!</p>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default WinnerBanner;
