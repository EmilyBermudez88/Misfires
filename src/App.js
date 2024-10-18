import { useState } from 'react';
import './App.css';
import DateDropdown from './components/DateDropdown';

function App() {

  const [selectedDate, setSelectedDate] = useState('');
  const chooseDate = (day) => setSelectedDate(day);
  console.log(selectedDate);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Misfires Lineup</h1>
      </header>
      <main>
        <DateDropdown chooseDate={chooseDate}/>
      </main>
    </div>
  );
}

export default App;
