import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import IconButton from './IconButton';
import Select from './Select';

import { updateAvailablePlayers } from '../util/playerUtils';
import { PlayersContext } from '../contexts/PlayersContext';
import { FormationContext } from '../contexts/FormationContext';

const Bench = ({ renderSubFormFromBench }) => {
	const [unavailable, setUnavailable] = useState([]);
  const [showPlayerPosition, setShowPlayerPosition] = useState(false);
  const { setAvailablePlayers, availablePlayers, formationPositions } = useContext(PlayersContext);
  const { formation } = useContext(FormationContext);
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
    const removeButtons =
      Array.from(benchedPlayersRef.current.querySelectorAll('.icon-button:not(.icon-button--update'));
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
    setAvailablePlayers(prev => updateAvailablePlayers(prev, { action: 'remove', player: removedPlayer }))
	}

	const addPlayer = (addedPlayer) => {
    setAvailablePlayers(prev => updateAvailablePlayers(prev, { action: 'add', player: addedPlayer }))
		setUnavailable(unavailable.filter((ind) => ind.name !== addedPlayer.name))
	}

  useEffect(() => {
    setUnavailable([]);
  }, [formation]);

	return (
    <section className="bench">
      <h2 className="bench__title">Bench</h2>
      <div className="available-list">
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
                  <IconButton onClick={() => setPlayerToEdit(player.name)} type="update"/>
                </span>
                <IconButton className={`${player.name}`} onClick={() => removePlayer(player)}/>
              </li>)
          }
          {renderSubWarning && !!formationPositions.length &&
            <li className="bench__player-option bench__sub-warning">
              <span>SUBS NEEDED</span>
              <IconButton onClick={() => renderSubFormFromBench(true)} type="add"/>
            </li>
          }
        </ul>
      </div>
      <div className="unavailable-list">
        <header className="bench__header">
          <h3 className="bench__subtitle unavailable">Unavailable</h3>
        </header>
        { !!unavailable.length && (
          <ul className="bench__player-list">
            { unavailable.map((player) =>
              <li className="bench__player-option unavailable" key={player.name}>
                {player.name}
                <IconButton onClick={() => addPlayer(player)} type="add"/>
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  )
}

Bench.propTypes = {
  renderSubFormFromBench: PropTypes.func
};

export default Bench;