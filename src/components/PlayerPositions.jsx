import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import JerseyRed from '../assets/JerseyRed.png';
import JerseyWhite from '../assets/JerseyWhite.png'
import Dropdown from './Dropdown';
import { PlayersContext } from '../App';

const PlayerPositions = ({ position, renderSubForm, jersey }) => {
	// We still want to parse the availablePlayers array into preferred positions to
	// make the choice easier of which player should go where
	const [preferredPlayers, setPreferredPlayers] = useState([]),
		[backupPlayers, setBackupPlayers] = useState([]),
		[open, setOpen] = useState(false),
    { updateAvailablePlayers, availablePlayers } = useContext(PlayersContext),
    dropdownOptions = preferredPlayers.length
      ? preferredPlayers
      : backupPlayers.length
        ? backupPlayers
        : [];

	const dropdownRef = useRef(null);
	const labelId = `field-position-${position}`;
  const jerseyImg = jersey.dropdownValue === 'away' ? JerseyWhite : JerseyRed;
  const titleClassName = classnames('field-position__title', {
    away: jersey.dropdownValue === 'away'
  });

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
        <img src={jerseyImg} alt="" className="field-position__icon"/>
        <p className={titleClassName} id={labelId}>{position}</p>
        <div className="dropdown" ref={dropdownRef} onBlur={handleBlur}>
          <Dropdown open={open}
                    setOpen={setOpen}
                    updateSelected={updateAvailablePlayers}
                    labelId={labelId}
                    options={dropdownOptions}
                    renderSubForm={renderSubForm}
                    position={position}
                    selectionType="position"/>
        </div>
      </div>
    </div>
	);
};

PlayerPositions.propTypes = {
  position: PropTypes.string,
  renderSubForm: PropTypes.func,
  jersey: PropTypes.string
};

export default PlayerPositions;
