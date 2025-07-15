import React from 'react';
import PropTypes from 'prop-types';

import TeamFormationDropdown from './TeamFormationDropdown';
import JerseyDropdown from './JerseyDropdown';
import SoccerBall from '../assets/soccer-ball.png';

import playerDataSet from '../util/playerDataSet';

const HeroSection = ({ setJerseyColour, setFormation, setAvailablePlayers }) => {
  const chooseFormation = (selection) => {
    const formationArr = selection.dropdownValue.split(' - ').map((line) => parseInt(line));
    setFormation(formationArr)
    setAvailablePlayers(playerDataSet);
  };

  return (
    <section className="hero-section">
      <div className="hero-section__title">
        <h1 className="hero-section__title-text">Misfires</h1>
        <img className="hero-section__image" src={SoccerBall}/>
      </div>
      <div className="hero-section__dropdowns">
        <TeamFormationDropdown chooseFormation={chooseFormation} />
        <JerseyDropdown chooseJersey={setJerseyColour} />
      </div>
    </section>
  );
}

HeroSection.propTypes = {
 setJerseyColour: PropTypes.func,
 setFormation: PropTypes.func,
 setAvailablePlayers: PropTypes.func
};

export default HeroSection;