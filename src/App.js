import React, { useState } from 'react';
import './styles/_base.scss';

import DateDropdown from './components/DateDropdown';
import TeamFormationDropdown from './components/TeamFormationDropdown';
import Bench from './components/Bench';
import FieldLayout from './assets/fieldLayout.png';
import SoccerBall from './assets/soccer-ball.png';
import PlayerPositions from './components/PlayerPositions';
import { positions } from './util/lineupData';
import playerDataSet from './util/playerDataSet';

function App() {
  const [availablePlayers, setAvailablePlayers] = useState(playerDataSet),
    [renderForm, setRenderForm] = useState(false),
    [selectedPosition, setSelectedPosition] = useState(''),
    [jerseyColour, setJerseyColour] = useState('home'),
    [formation, setFormation] = useState('');

    const updateAvailablePlayers = (...actions) => {
      let availablePlayersCopy = availablePlayers;

      const removePlayer = (playerToRemove, playerArr) =>
        availablePlayersCopy = playerArr.filter((ind) => ind.name !== playerToRemove.name);

        const addPlayer = (playerToAdd, playerArr) => {
        //player to add may not exist in dataset because they're an extra sub
        const playerFromRoster = playerDataSet.find((player) => player.name === playerToAdd.name);
        const playerInfo = playerFromRoster ? playerFromRoster : playerToAdd;
        return availablePlayersCopy = playerArr.concat(playerInfo);
      }

      actions.forEach((update) => update.action === 'remove'
        ? removePlayer(update.player, availablePlayersCopy)
        : addPlayer(update.player, availablePlayersCopy)
      )
      setAvailablePlayers(availablePlayersCopy);
    }

  let formationPositions = [];
  const definePosition = (line, idx) => {
    for (const prop in positions) {
      if (prop === line) {
        if (!formationPositions.includes(positions[prop][idx])) {
          formationPositions.push(positions[prop][idx]);
        }
        return positions[prop][idx]
      }
    }
  }
	const renderGoalie = (num) => {
		const children= []
		for (let i = 0; i < num; i++) {
      const goalie = definePosition('goalie', i);
			children.push(<PlayerPositions position={goalie}
                                  updateAvailablePlayers={updateAvailablePlayers}
                                  availablePlayers={availablePlayers}
                                  renderSubForm={renderSubForm}
                                  jersey={jerseyColour} />);
		}
		return children;
	}

	const renderDefense = (num) => {
		const children = []
		for (let i = 0; i < num; i++) {
      const defense = definePosition('defense', i);
			children.push(<PlayerPositions position={defense}
                                  updateAvailablePlayers={updateAvailablePlayers}
                                  availablePlayers ={availablePlayers}
                                  renderSubForm={renderSubForm}
                                  jersey={jerseyColour}/>);
		}
		if (num === 3) {
			// move centre back position to centre of defense line
			children.splice(1, 0, children.splice(-1)[0])
		}
		return children;
	}

	const renderMidfield = (num) => {
		const children = []
		if (num === 1) {
      const midfield = definePosition('midfield', num);
			children.push(<PlayerPositions position={midfield}
                                  updateAvailablePlayers={updateAvailablePlayers}
                                  availablePlayers ={availablePlayers}
                                  renderSubForm={renderSubForm}
                                  jersey={jerseyColour}/>);
		}
		else if (num === 2) {
			for (let i = 0; i <= num; i = i + 2) {
        const midfield = definePosition('midfield', i);
				children.push(<PlayerPositions position={midfield}
                                   updateAvailablePlayers={updateAvailablePlayers}
                                   availablePlayers ={availablePlayers}
                                   renderSubForm={renderSubForm}
                                   jersey={jerseyColour}/>);
			}
		}
		else {
			for (let i = 0; i < num; i++) {
        const midfield = definePosition('midfield', i);
				children.push(<PlayerPositions position={midfield}
                                   updateAvailablePlayers={updateAvailablePlayers}
                                   availablePlayers ={availablePlayers}
                                   renderSubForm={renderSubForm}
                                   jersey={jerseyColour}/>);
			}
		}
		return children;
	}

	const renderAttack = (num) => {
		const children = []
		for (let i = 0; i < num; i++) {
      const attack = definePosition('attack', i);
			children.push(<PlayerPositions position={attack}
                                  updateAvailablePlayers={updateAvailablePlayers}
                                  availablePlayers={availablePlayers}
                                  renderSubForm={renderSubForm}
                                  jersey={jerseyColour}/>);
		}
		return children;
	}

  const renderSubForm = (show, position) => {
    setRenderForm(show);
    position ? setSelectedPosition(position): setSelectedPosition('');
  };

  const chooseFormation = (selection) => {
    const formationArr = selection.dropdownValue.split(' - ').map((line) => parseInt(line));
    setFormation(formationArr)
  };

  return (
    <div className="app">
      <main className="app__main">
        <section className="intro-content">
          <div className="intro-content__title">
            <h1>Misfires</h1>
            <img className="intro-content__image" src={SoccerBall}/>
          </div>
          <TeamFormationDropdown chooseFormation={chooseFormation} />
          <DateDropdown chooseJersey={setJerseyColour} />
        </section>
        <div className="field">
          <img className="field__image" src={FieldLayout}/>
          <div className="field__setup">
            { formation ?
              <>
                <div className="field__line">{renderGoalie(formation[0])}</div>
                <div className="field__line">{renderDefense(formation[1])}</div>
                <div className="field__line">{renderMidfield(formation[2])}</div>
                <div className="field__line">{renderAttack(formation[3])}</div>
              </>
              :
              <h3 className="field__warning">
                <span>Please Select a Formation</span>
              </h3>
              }
          </div>
        </div>
        <Bench updateAvailablePlayers={updateAvailablePlayers}
               availablePlayers ={availablePlayers}
               renderForm={renderForm}
               setRenderForm={setRenderForm}
               selectedPosition={selectedPosition}
               formationPositions={formationPositions} />
      </main>
    </div>
  );
}

export default App;

// REBUILD -->
  // dateDropdown --> date will provide time, field, home/away

// STRETCH GOALS
// bench roles - who/position they are going to sub for
  // if bench is below 2, warning to add another sub
// how to screenshot / capture the field layout with players
// editing players availability