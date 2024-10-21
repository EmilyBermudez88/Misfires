import { useState } from 'react';
import './App.css';
import DateDropdown from './components/DateDropdown';
import TeamFormationDropdown from './components/TeamFormationDropdown';
import FieldLineup from './components/FieldLineup';

function App() {

  const [selectedDate, setSelectedDate] = useState('');
  const [formation, setFormation] = useState('');

  const chooseDate = (day) => setSelectedDate(day);
  const chooseFormation = (layout) => setFormation(layout);
  console.log(selectedDate, formation);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Misfires Lineup</h1>
      </header>
      <main>
        <form>
          <DateDropdown chooseDate={chooseDate}/>
          <TeamFormationDropdown chooseFormation={chooseFormation} />
        </form>
        <FieldLineup formation={formation}/>
      </main>
    </div>
  );
}

export default App;

// REBUILD -->
  // dateDropdown --> date will provide time, field, home/away
  // availablePlayers will not be assigned via gameDates, but buttons on the bench to be removed
  // (with an in/out to add or remove players)


// STRETCH GOALS
// bench roles - who/position they are going to sub for
  // if bench is below 2, warning to add another sub
// how to screenshot / capture the field layout with players
// editing players availability