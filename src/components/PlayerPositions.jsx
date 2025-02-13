import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Jersey from '../assets/Jersey.png';
import Dropdown from './Dropdown';

const PlayerPositions = ({ position, updateAvailablePlayers, availablePlayers, renderSubForm }) => {
	// We still want to parse the availablePlayers array into preferred positions to
	// make the choice easier of which player should go where
	const [preferredPlayers, setPreferredPlayers] = useState([]),
		[backupPlayers, setBackupPlayers] = useState([]),
		[open, setOpen] = useState(false),
    dropdownOptions = preferredPlayers.length
      ? preferredPlayers
      : backupPlayers.length
        ? backupPlayers
        : [];

	const dropdownRef = useRef(null);
	const labelId = `field-position-${position}`;

	useEffect(() => {
		setPreferredPlayers(availablePlayers.filter((player) =>
      player.position === position || player.secondPosition === position));
		setBackupPlayers(availablePlayers.filter((player) => player.thirdPosition === position));
	}, [position, availablePlayers])

	const handleBlur=(e) => {
		if (!dropdownRef.current.contains(e.relatedTarget)) {
			setOpen(false)
		}
	}

	return (
    <div className="field-position">
      <div className="field-position__icon-container">
        <img src={Jersey} alt="" className="field-position__icon"/>
        <p className= "field-position__title" id={labelId}>{position}</p>
        <div className="field-position-dropdown" ref={dropdownRef} onBlur={handleBlur}>
          <Dropdown open={open}
                    setOpen={setOpen}
                    updateAvailablePlayers={updateAvailablePlayers}
                    labelId={labelId}
                    options={dropdownOptions}
                    renderSubForm={renderSubForm}
                    position={position} />
        </div>
      </div>
    </div>
	);
};

const availablePlayersPropType = PropTypes.shape({
  name: PropTypes.string,
  position: PropTypes.string,
  secondPosition: PropTypes.string,
  thirdPosition: PropTypes.string
})

PlayerPositions.propTypes = {
  position: PropTypes.string,
  availablePlayers: PropTypes.arrayOf(availablePlayersPropType),
  updateAvailablePlayers: PropTypes.func,
  renderSubForm: PropTypes.func
};

export default PlayerPositions;
