import { useState } from 'react';
import './App.css';
// import players from './util/playerDataSet';
import DateDropdown from './components/DateDropdown';
import TeamFormationDropdown from './components/TeamFormationDropdown';

function App() {

  const [selectedDate, setSelectedDate] = useState('');
  const [formation, setFormation] = useState([]);
  // const [availablePlayers, setAvailablePlayers] = useState([]);
  // console.log(availablePlayers);

  const chooseDate = (day) => setSelectedDate(day);
  const chooseFormation = (layout) => setFormation(layout);
  console.log(selectedDate, formation);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Misfires Lineup</h1>
      </header>
      <main>
        <DateDropdown chooseDate={chooseDate}/>
        <TeamFormationDropdown chooseFormation={chooseFormation} />
      </main>
    </div>
  );
}

export default App;

//for available players:
// need to loop through the dataset array to check if the date selected is amongst the the list of
// each player's available dates
// if it is, add it to the available players array, otherwise ignore it