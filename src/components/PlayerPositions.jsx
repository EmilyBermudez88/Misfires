import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Dropdown from './Dropdown';
import JerseyRed from '../assets/JerseyRed.png';
import JerseyWhite from '../assets/JerseyWhite.png'

import { PlayersContext } from '../contexts/PlayersContext';
import { updateAvailablePlayers } from '../util/playerUtils';

const PlayerPositions = ({ position, renderSubForm, jersey }) => {
  const { availablePlayers } = useContext(PlayersContext);

	const labelId = `field-position-${position}`;
  const jerseyImg = jersey.dropdownValue === 'away' ? JerseyWhite : JerseyRed;
  const titleClassName = classnames('field-position__title', {
    away: jersey.dropdownValue === 'away'
  });

  const getDropdownOptions = () => {
    // We still want to parse the availablePlayers array into preferred positions to
    // make the choice easier of which player should go where
    const preferred = availablePlayers.filter(player => player.position.includes(position));
    if (preferred.length) {
      return preferred.map((player) => ({ ...player, dropdownValue: player.name }));
    } else {
      const backup = availablePlayers.filter(player => player.backupPosition === position);
      if (backup.length) {
        return backup.map((player) => ({ ...player, dropdownValue: player.name }));
      } else {
        return [];
      }
    }
  }

	return (
    <div className="field-position">
      <div className="field-position__icon-container">
        <img role="presentation" src={jerseyImg} className="field-position__icon"/>
        <p className={titleClassName} id={labelId}>{position}</p>
        <Dropdown updateSelected={updateAvailablePlayers}
                  labelId={labelId}
                  options={getDropdownOptions()}
                  renderSubForm={renderSubForm}
                  position={position}
                  selectionType="position"/>
      </div>
    </div>
	);
};

PlayerPositions.propTypes = {
  position: PropTypes.string,
  renderSubForm: PropTypes.func,
  jersey: PropTypes.shape({
    dropdownValue: PropTypes.string
  })
};

export default PlayerPositions;
