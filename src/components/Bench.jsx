import React, { useState, useRef, useContext, useEffect } from 'react';
// import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import AddSubForm from './AddSubForm';
import EditButton from './EditButton';
import Select from './Select';
import { PlayersContext } from '../App';
import Background from '../assets/background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Bench = ({ renderSubFormFromBench, formation }) => {
	const [unavailable, setUnavailable] = useState([]);
  const [showPlayerPosition, setShowPlayerPosition] = useState(false);
  const { updateAvailablePlayers, availablePlayers, formationPositions } = useContext(PlayersContext);
  const renderSubWarning = availablePlayers.length < 2;
  const toggleText = showPlayerPosition ? 'Hide Positions' : 'Show Positions';
  const [playerToEdit, setPlayerToEdit] = useState('');

  const benchedPlayersRef = useRef(null);
  const benchPositionClassnames = classnames('bench__position-container', {
    hidden: !showPlayerPosition
  });

  // when a player is removed, we should set the focus to the NEXT 'x'
	const removePlayer = (removedPlayer) => {
    if (!removedPlayer.sub) {
      setUnavailable([...unavailable, removedPlayer]);
    }
      // const arr = Array.from(benchedPlayersRef.current.querySelectorAll('.button--edit'));
      // console.log(arr);
		updateAvailablePlayers({ action: 'remove', player: removedPlayer })
	}
	const addPlayer = (addedPlayer) => {
		updateAvailablePlayers({ action: 'add', player: addedPlayer })
		setUnavailable(unavailable.filter((ind) => ind.name !== addedPlayer.name))
	}

  useEffect(() => {
    setUnavailable([]);
  }, [formation]);

	return (
    <div className="bench">
      <img className="bench__background" src={Background}/>
      <h2 className="bench__title">Bench</h2>
      <div className="toggle-label-container">
        <label className="toggle">
          <span id="toggle-text" className="toggle__text">{toggleText}</span>
          <input className="toggle__input"
                 type="checkbox"
                 role="switch"
                 checked={showPlayerPosition}
                 onChange={() => setShowPlayerPosition(!showPlayerPosition)}
                 aria-labelledby="toggle-text"/>
          <span className="toggle__container">
            <span className="toggle__slider"/>
          </span>
        </label>
      </div>
      <ul ref={benchedPlayersRef}className="bench__player-list">
        {
          availablePlayers.map((player) =>
            <li className="bench__player-option" key={player.name}>
              <span className="bench__player-name">{player.name}</span>
              <span className={benchPositionClassnames}>
                <Select player={player} edit={player.name === playerToEdit} handleSelection={setPlayerToEdit}/>
                <button onClick={() => setPlayerToEdit(player.name)}className="button--edit update">
                  <FontAwesomeIcon icon={faPenToSquare}/>
                </button>
              </span>
              <EditButton className={`${player.name}`} onClick={() => removePlayer(player)} type="remove"/>
            </li>)
        }
      </ul>
      {renderSubWarning && !!formationPositions.length &&
        <>
          <p className="bench__sub-warning">MORE SUBS NEEDED</p>
          <button className="bench__sub-button sub-form__button" onClick={() => renderSubFormFromBench(true)}>
            Add A Sub
          </button>
        </>
      }
      <h2 className="bench__title unavailable">Unavailable</h2>
      <ul className="bench__player-list">
        { unavailable.map((player) =>
          <li className="bench__player-option unavailable" key={player.name}>
            {player.name}
            <EditButton onClick={() => addPlayer(player)} type="add" />
          </li>
        )}
      </ul>
    </div>
  )
}

// const availablePlayersPropType = PropTypes.shape({
//   name: PropTypes.string,
//   position: PropTypes.string,
//   secondPosition: PropTypes.string,
//   thirdPosition: PropTypes.string
// })

Bench.propTypes = {
  formation: PropTypes.arrayOf(PropTypes.string),
  renderSubFormFromBench: PropTypes.func
};

export default Bench;