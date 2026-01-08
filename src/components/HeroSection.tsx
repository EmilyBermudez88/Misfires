import React from 'react';

import TeamFormationDropdown from './TeamFormationDropdown';
import JerseyDropdown from './JerseyDropdown';
import SoccerBall from '../assets/soccer-ball.png';

import playerDataSet from '../utils/playerDataSet';
import { JerseyColourType, PlayerType } from '../types/types';

interface HeroProps {
  setJerseyColour: (color: JerseyColourType) => void;
  setFormation: (formation: number[]) => void;
  setFormationString: (formation: string) => void;
  setAvailablePlayers: (players: PlayerType[]) => void;
  formationString?: string;
  jerseyColour: JerseyColourType;
}

const HeroSection = ({ setJerseyColour,
    setFormation,
    setFormationString,
    setAvailablePlayers,
    formationString,
    jerseyColour
  }: HeroProps) => {

  const chooseFormation = (selection: string) => {
    const formationArr = selection.split(' - ').map((line) => parseInt(line));
    setFormation(formationArr);
    setFormationString(selection);
    setAvailablePlayers(playerDataSet);
  };

  return (
    <section className="hero-section">
      <div className="hero-section__title">
        <h1 className="hero-section__title-text">Misfires</h1>
        <img className="hero-section__image" src={SoccerBall}/>
      </div>
      <div className="hero-section__dropdowns">
        <TeamFormationDropdown chooseFormation={chooseFormation} selectedFormation={formationString} />
        <JerseyDropdown chooseJersey={setJerseyColour} jerseyColour={jerseyColour} />
      </div>
    </section>
  );
}

export default HeroSection;