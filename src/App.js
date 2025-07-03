import React, { useState, createContext } from 'react';
import './styles/_base.scss';
import classnames from 'classnames';
import JerseyDropdown from './components/JerseyDropdown';
import TeamFormationDropdown from './components/TeamFormationDropdown';
import Bench from './components/Bench';
import AddSubForm from './components/AddSubForm';
import FieldLayout from './assets/fieldLayout.png';
import SoccerBall from './assets/soccer-ball.png';
import PlayerPositions from './components/PlayerPositions';
import { positions } from './util/lineupData';
import playerDataSet from './util/playerDataSet';

export const FormationContext = createContext({ formation: null });
export const PlayersContext =
  createContext({ availablePlayers: null, updateAvailablePlayers: null, formationPositions: null });

function App() {
  const [availablePlayers, setAvailablePlayers] = useState(playerDataSet),
    [renderForm, setRenderForm] = useState(false),
    [selectedPosition, setSelectedPosition] = useState(''),
    [jerseyColour, setJerseyColour] = useState('home'),
    [formation, setFormation] = useState([]);
  const fieldLineClassNames = classnames('field__line', {
    spread: formation.length < 4
  });

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
                                     renderSubForm={renderSubForm}
                                     jersey={jerseyColour} />);
		}
		return children;
	}

	const renderDefense = (num) => {
		const children = []
		if (num === 3) {
      for (let i = 0; i < num; i++) {
        const defense = definePosition('defense', i);
				children.push(<PlayerPositions position={defense}
                                   renderSubForm={renderSubForm}
                                   jersey={jerseyColour}/>);
			}
		} else {
      for (let i = 0; i < num; i++) {
        const defense = definePosition('defense', 1);
        children.push(<PlayerPositions position={defense}
                                       renderSubForm={renderSubForm}
                                       jersey={jerseyColour}/>);
      }
    }
		return children;
	}

	const renderMidfield = (num) => {
		const children = []
		if (num === 1) {
      const midfield = definePosition('midfield', num);
			children.push(<PlayerPositions position={midfield}
                                  renderSubForm={renderSubForm}
                                  jersey={jerseyColour}/>);
		}
		else if (num === 2) {
			for (let i = 0; i <= num; i = i + 2) {
        const midfield = definePosition('midfield', i);
				children.push(<PlayerPositions position={midfield}
                                   renderSubForm={renderSubForm}
                                   jersey={jerseyColour}/>);
			}
		}
		else {
			for (let i = 0; i < num; i++) {
        const midfield = definePosition('midfield', i);
				children.push(<PlayerPositions position={midfield}
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
    setAvailablePlayers(playerDataSet);
  };

  const playersContext = { availablePlayers, updateAvailablePlayers, formationPositions };
  const formationContext = { formation }

  return (
    <>
      <div className="app">
        <main className="app__main">
          <section className="intro-content">
            <div className="intro-content__title">
              <h1>Misfires</h1>
              <img className="intro-content__image" src={SoccerBall}/>
            </div>
            <div className="intro-content__dropdowns">
              <TeamFormationDropdown chooseFormation={chooseFormation} />
              <JerseyDropdown chooseJersey={setJerseyColour} />
            </div>
          </section>
          <PlayersContext.Provider value={playersContext} >
            <div className="field">
              <img className="field__image" src={FieldLayout}/>
              <FormationContext.Provider value={formationContext}>
                <div className="field__setup">
                  { formation.length &&
                    <>
                      <div className={fieldLineClassNames}>{renderGoalie(formation[0])}</div>
                      <div className={fieldLineClassNames}>{renderDefense(formation[1])}</div>
                      <div className={fieldLineClassNames}>{renderMidfield(formation[2])}</div>
                      <div className={fieldLineClassNames}>{renderAttack(formation[3])}</div>
                    </>
                    }
                </div>
              </FormationContext.Provider>
            </div>
            <Bench renderSubFormFromBench={renderSubForm}
                  formation={formation} />
          </PlayersContext.Provider>
        </main>
        {renderForm &&
          <AddSubForm onSubmit={updateAvailablePlayers}
                      formationPositions={formationPositions}
                      selectedPosition={selectedPosition}
                      openModal={renderForm}
                      closeModal={()=> setRenderForm(false)}/>
        }
      </div>
      { !formation.length &&
        <div className="overlay">
          <h3 className="overlay__warning">
            <span>Please Select a Formation</span>
          </h3>
        </div>
      }
    </>
  );
}

export default App;

// TO DO
// how to screenshot / capture the field layout with players