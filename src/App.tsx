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
import { JerseyColourType, PlayerType, LineType, AvailablePositions } from './types/types';

function App() {
  const [availablePlayers, setAvailablePlayers] = useState<PlayerType[]>(playerDataSet),
    [renderForm, setRenderForm] = useState(false),
    [selectedPosition, setSelectedPosition] = useState<AvailablePositions | null>(null),
    [jerseyColour, setJerseyColour] = useState<JerseyColourType>('home'),
    [formation, setFormation] = useState<number[]>([]),
    [formationString, setFormationString] = useState<string>('');

  const fieldLineClassNames = classnames('field__line', {
    spread: formation.length < 4
  });

  const formationPositions: AvailablePositions[] = [];

  const definePosition = (line: LineType, idx: number) => {
    const positionName = positions[line][idx];
    if (!formationPositions.includes(positionName)) {
      formationPositions.push(positionName);
    }
    return positionName;

  }

	const renderGoalie = (num: number): React.JSX.Element[] => {
		const children= []
		for (let i = 0; i < num; i++) {
      const goalie = definePosition('goalie', i);
      children.push(<PlayerPositions key="goalie"
                                     position={goalie}
                                     renderSubForm={renderSubForm}
                                     jersey={jerseyColour} />);
		}
		return children;
	}

	const renderDefense = (num: number): React.JSX.Element[] => {
		const children = []
		if (num === 3) {
      for (let i = 0; i < num; i++) {
        const defense = definePosition('defense', i);
				children.push(<PlayerPositions key={`defense-${i}`}
                                   position={defense}
                                   renderSubForm={renderSubForm}
                                   jersey={jerseyColour}/>);
			}
		} else {
      for (let i = 0; i < num; i++) {
        const defense = definePosition('defense', 1);
        children.push(<PlayerPositions key={`defense-${i}`}
                                       position={defense}
                                       renderSubForm={renderSubForm}
                                       jersey={jerseyColour}/>);
      }
    }
		return children;
	}
	const renderMidfield = (num: number): React.JSX.Element[] => {
		const children = []
		if (num === 1) {
      const midfield = definePosition('midfield', num);
			children.push(<PlayerPositions key="midfield"
                                  position={midfield}
                                  renderSubForm={renderSubForm}
                                  jersey={jerseyColour}/>);
		}
		else if (num === 2) {
			for (let i = 0; i <= num; i = i + 2) {
        const midfield = definePosition('midfield', i);
				children.push(<PlayerPositions key={`midfield-${i}`}
                                   position={midfield}
                                   renderSubForm={renderSubForm}
                                   jersey={jerseyColour}/>);
			}
		}
		else {
			for (let i = 0; i < num; i++) {
        const midfield = definePosition('midfield', i);
				children.push(<PlayerPositions key={`midfield-${i}`}
                                   position={midfield}
                                   renderSubForm={renderSubForm}
                                   jersey={jerseyColour}/>);
			}
		}
		return children;
	}

	const renderAttack = (num: number): React.JSX.Element[] => {
		const children = []
		for (let i = 0; i < num; i++) {
      const attack = definePosition('attack', i);
			children.push(<PlayerPositions key={`attack-${i}`}
                                  position={attack}
                                  renderSubForm={renderSubForm}
                                  jersey={jerseyColour}/>);
		}
		return children;
	}

  const renderSubForm = (show: boolean, position: AvailablePositions | undefined): void => {
    setRenderForm(show);
    position ? setSelectedPosition(position): setSelectedPosition(null);
  };

  const playersContext = { availablePlayers, setAvailablePlayers, formationPositions };
  const formationContext = { formation, formationString, setFormation, setFormationString };

  return (
    <>
      <div className="app">
        <main className="app__main">
          <HeroSection setJerseyColour={setJerseyColour}
                       setFormation={setFormation}
                       setFormationString={setFormationString}
                       setAvailablePlayers={setAvailablePlayers}
                       formationString={formationString}
                       jerseyColour={jerseyColour}/>
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
              <Bench renderSubFormFromBench={renderSubForm}/>
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
