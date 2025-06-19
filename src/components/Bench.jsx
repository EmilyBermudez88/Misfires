import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import EditButton from './EditButton';
import Select from './Select';
import { PlayersContext } from '../App';
import Background from '../assets/background-measured.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Bench = ({ renderSubFormFromBench, formation }) => {
	const [unavailable, setUnavailable] = useState([]);
  const [showPlayerPosition, setShowPlayerPosition] = useState(false);
  const { updateAvailablePlayers, availablePlayers, formationPositions } = useContext(PlayersContext);
  const renderSubWarning = availablePlayers.length < 4;
  const toggleText = showPlayerPosition ? 'Hide Positions' : 'Show Positions';
  const [playerToEdit, setPlayerToEdit] = useState('');

  const benchedPlayersRef = useRef(null);
  const benchPositionClassnames = classnames('bench__position-container', {
    hidden: !showPlayerPosition
  });

	const removePlayer = (removedPlayer) => {
    if (!removedPlayer.sub) {
      setUnavailable([...unavailable, removedPlayer]);
    }
    const removeButtons = Array.from(benchedPlayersRef.current.querySelectorAll('.button--edit:not(.update'));
    const removedPlayerBtnIdx = removeButtons.findIndex((el) =>
      el.classList.contains(removedPlayer.name)
    );
    const nextPlayer =
      removedPlayerBtnIdx >= 0 && removedPlayerBtnIdx < removeButtons.length - 1
        ? removeButtons[removedPlayerBtnIdx + 1]
        : removeButtons[removeButtons.length - 2];

    if (nextPlayer) {
      nextPlayer.focus();
    }
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
    <section className="bench">
      <div className="bench__background-container">
        <img className="bench__background" src={Background}/>
      </div>
      <h2 className="bench__title">Bench</h2>
      <div className="available-list">
        <header className="bench__header--available">
          <h2 className="bench__title unavailable">Available</h2>
        </header>
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
      </div>
      <div className="unavailable-list">
        <header className="bench__header--unavailable">
          <h2 className="bench__title unavailable">Unavailable</h2>
        </header>
        <ul className="bench__player-list">
          { unavailable.map((player) =>
            <li className="bench__player-option unavailable" key={player.name}>
              {player.name}
              <EditButton onClick={() => addPlayer(player)} type="add" />
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}

Bench.propTypes = {
  formation: PropTypes.arrayOf(PropTypes.number),
  renderSubFormFromBench: PropTypes.func
};

export default Bench;