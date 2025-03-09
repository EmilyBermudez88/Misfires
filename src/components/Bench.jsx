import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import AddSubForm from './AddSubForm';
import EditButton from './EditButton';
import Select from './Select';
import Background from '../assets/background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Bench = ({ updateAvailablePlayers,
    availablePlayers,
    renderForm,
    setRenderForm,
    selectedPosition,
    formationPositions
  }) => {
	const [unavailable, setUnavailable] = useState([]);
  const [showPlayerPosition, setShowPlayerPosition] = useState(false);
  const renderSubWarning = availablePlayers.length < 2 && !renderForm;
  const toggleText = showPlayerPosition ? 'Hide Positions' : 'Show Positions';
  const [playerToEdit, setPlayerToEdit] = useState('');

  const benchedPlayersRef = useRef(null);
  // when a player is removed, we should set the focus to the NEXT 'x'
	const removePlayer = (removedPlayer) => {
      const arr = Array.from(benchedPlayersRef.current.querySelectorAll('.button--edit'));
  console.log(arr);
		setUnavailable([...unavailable, removedPlayer]);
		updateAvailablePlayers({ action: 'remove', player: removedPlayer })
	}
	const addPlayer = (addedPlayer) => {
		updateAvailablePlayers({ action: 'add', player: addedPlayer })
		setUnavailable(unavailable.filter((ind) => ind.name !== addedPlayer.name))
	}

  const onSubmit = (addSubProp) => {
    setRenderForm(false);
    updateAvailablePlayers({ action: 'add', player: addSubProp });
  }

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
              {showPlayerPosition &&
                <span className="bench__position-container">
                  <Select player={player} edit={player.name === playerToEdit} handleSelection={setPlayerToEdit}/>
                  <button onClick={() => setPlayerToEdit(player.name)}className="button--edit update">
                    <FontAwesomeIcon icon={faPenToSquare}/>
                  </button>
                </span>
              }
              <EditButton onClick={() => removePlayer(player)} type="remove"/>
            </li>)
        }
      </ul>
      {renderSubWarning &&
        <>
          <p>WARNING: more subs needed</p>
          <button onClick={() => setRenderForm(true)}>Add A Sub</button>
        </>
      }
      {renderForm &&
        <AddSubForm formationPostions={formationPositions}
                    onSubmit={onSubmit}
                    selectedPosition={selectedPosition}
                    setRenderForm={setRenderForm}/>
      }
      <h2 className="bench__title unavailable">Unavailable</h2>
      <ul className="bench__player-list">
        { unavailable.map((player) =>
          <li className="bench__player-option" key={player.name}>
            {player.name}
            <EditButton onClick={() => addPlayer(player)} type="add" />
          </li>
        )}
      </ul>
    </div>
  )
}

const availablePlayersPropType = PropTypes.shape({
  name: PropTypes.string,
  position: PropTypes.string,
  secondPosition: PropTypes.string,
  thirdPosition: PropTypes.string
})

Bench.propTypes = {
  updateAvailablePlayers: PropTypes.func,
  availablePlayers: PropTypes.arrayOf(availablePlayersPropType),
  selectedPosition: PropTypes.string,
  formationPositions: PropTypes.arrayOf(PropTypes.string),
  renderForm: PropTypes.bool,
  setRenderForm: PropTypes.func
};

export default Bench;