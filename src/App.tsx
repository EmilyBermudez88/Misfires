import React, { useContext, useState } from 'react';

import TeamFormationDropdown from './components/TeamFormationDropdown';
import JerseyDropdown from './components/JerseyDropdown';
import Field from './components/Field';
import Bench from './components/Bench';
import AddSubForm from './components/AddSubForm';
import SoccerBall from './assets/soccer-ball.png';

import { FormationContext } from './contexts/FormationContext';
import PlayersProvider from './contexts/PlayersContext';
import JerseyProvider from './contexts/JerseyContext';
import { AvailablePositions, renderSubFormType } from './types/types';

function App() {
  const { formation } = useContext(FormationContext);
  const [renderForm, setRenderForm] = useState(false),
    [selectedPosition, setSelectedPosition] = useState<AvailablePositions | null>(null);

  const renderSubForm: renderSubFormType = (show, position) => {
    setRenderForm(show);
    position ? setSelectedPosition(position): setSelectedPosition(null);
  };

  return (
    <>
      <div className="app">
        <PlayersProvider>
            <main className="app__main">
              <JerseyProvider>
                <section className="hero-section">
                  <div className="hero-section__title">
                    <h1 className="hero-section__title-text">Misfires</h1>
                    <img className="hero-section__image" src={SoccerBall}/>
                  </div>
                  <div className="hero-section__dropdowns">
                    <TeamFormationDropdown />
                    <JerseyDropdown />
                  </div>
                </section>
                <Field renderSubForm={renderSubForm}/>
              </JerseyProvider>
              <Bench renderSubFormFromBench={renderSubForm}/>
            </main>
          {renderForm &&
            <AddSubForm selectedPosition={selectedPosition}
                        openModal={renderForm}
                        closeModal={()=> setRenderForm(false)}/>
          }
        </PlayersProvider>
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
