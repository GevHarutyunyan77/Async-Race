import { useAppDispatch, useAppSelector } from './app/hooks';
import { setActiveView } from './features/ui/uiSlice';
import { VIEWS } from './constants/app';
import GarageView from './components/Garage/GarageView';
import WinnersView from './components/Winners/WinnersView';

function App() {
  const dispatch = useAppDispatch();
  const activeView = useAppSelector((state) => state.ui.activeView);
  const isRaceRunning = useAppSelector((state) => state.race.isRaceRunning);

  const handleViewChange = (view: typeof VIEWS.GARAGE | typeof VIEWS.WINNERS) => {
    if (isRaceRunning) {
      return;
    }

    dispatch(setActiveView(view));
  };

  return (
    <div className="app">
      <nav className="navigation">
        <button
          type="button"
          className={activeView === VIEWS.GARAGE ? 'active' : ''}
          onClick={() => handleViewChange(VIEWS.GARAGE)}
        >
          GARAGE
        </button>
        <button
          type="button"
          className={activeView === VIEWS.WINNERS ? 'active' : ''}
          onClick={() => handleViewChange(VIEWS.WINNERS)}
          disabled={isRaceRunning}
        >
          WINNERS
        </button>
      </nav>

      {activeView === VIEWS.GARAGE ? <GarageView /> : <WinnersView />}
    </div>
  );
}

export default App;
