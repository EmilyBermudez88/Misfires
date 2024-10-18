import './App.css';
import players from './util/playerDataSet';
import gameDates from './util/gameDates';

function App() {
  console.log(players);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Misfires Lineup</h1>
      </header>
      <main>
        {
          gameDates.map((date)=>
            <p key={date}>{date}</p>
          )
        }
      </main>
    </div>
  );
}

export default App;
