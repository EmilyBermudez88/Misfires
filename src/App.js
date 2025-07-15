import React, { useState } from 'react';
import classnames from 'classnames';

import HeroSection from './components/HeroSection';
import Bench from './components/Bench';
import PlayerPositions from './components/PlayerPositions';
import AddSubForm from './components/AddSubForm';
import FieldLayout from './assets/fieldLayout.png';

import { positions } from './util/lineupData';
import playerDataSet from './util/playerDataSet';
import { FormationContext } from './contexts/FormationContext';
import { PlayersContext } from './contexts/PlayersContext';

import './styles/_base.scss';

function App() {
  const [availablePlayers, setAvailablePlayers] = useState(playerDataSet),
    [renderForm, setRenderForm] = useState(false),
    [selectedPosition, setSelectedPosition] = useState(''),
    [jerseyColour, setJerseyColour] = useState('home'),
    [formation, setFormation] = useState([]);
  const fieldLineClassNames = classnames('field__line', {
    spread: formation.length < 4
  });

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

  const playersContext = { availablePlayers, setAvailablePlayers, formationPositions };
  const formationContext = { formation }

  return (
    <>
      <div className="app">
        <main className="app__main">
          <HeroSection setJerseyColour={setJerseyColour}
                       setFormation={setFormation}
                       setAvailablePlayers={setAvailablePlayers}/>
          <PlayersContext.Provider value={playersContext} >
            <FormationContext.Provider value={formationContext}>
              <div className="field">
                <img className="field__image" src={FieldLayout}/>
                <div className="field__setup">
                  { !!formation.length &&
                    <>
                      <div className={fieldLineClassNames}>{renderGoalie(formation[0])}</div>
                      <div className={fieldLineClassNames}>{renderDefense(formation[1])}</div>
                      <div className={fieldLineClassNames}>{renderMidfield(formation[2])}</div>
                      <div className={fieldLineClassNames}>{renderAttack(formation[3])}</div>
                    </>
                    }
                </div>
              </div>
              <Bench renderSubFormFromBench={renderSubForm} formation={formation}/>
            </FormationContext.Provider>
          </PlayersContext.Provider>
        </main>
        {renderForm &&
          <AddSubForm setAvailablePlayers={setAvailablePlayers}
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
//look at naming conventions for toggle & dropdown