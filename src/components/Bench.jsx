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
  const [playerToEdit, setPlayerToEdit] = useState('');
  const { setAvailablePlayers, availablePlayers } = useContext(PlayersContext);
  const { formation } = useContext(FormationContext);

  const renderSubWarning = availablePlayers.length < 4;
  const toggleText = showPlayerPosition ? 'Hide Positions' : 'Show Positions';

  const benchedPlayersRef = useRef(null);
  const unavailablePlayersRef = useRef(null);

  const benchPositionClassnames = classnames('bench__position-container', {
    hidden: !showPlayerPosition
  });
  const calculateButtonClassName = (player, action) =>
    `bench__${action}-btn--${player.replace(/\s+/g, '-').toLowerCase()}`

  const handleFocusChange = (action, playerName, buttonSelector) => {
    const listRef = action === 'add' ? unavailablePlayersRef : benchedPlayersRef;
    const removeButtons = Array.from(listRef.current?.querySelectorAll(buttonSelector)) || [];
    const removedBtnIdx = removeButtons.findIndex((el) =>
      el.classList.contains(calculateButtonClassName(playerName, action)));

    //If button is last in array, focus on the previous button. Otherwise, focus on next button
    const buttonToFocus =
      removedBtnIdx === removeButtons.length - 1
        ? removeButtons[removeButtons.length - 2]
        : removeButtons[removedBtnIdx + 1];

    if (buttonToFocus) {
      buttonToFocus.focus();
    }
  }

  const removePlayer = (removedPlayer) => {
    setAvailablePlayers(prev => updateAvailablePlayers(prev, { action: 'remove', player: removedPlayer }));
    if (!removedPlayer.sub) {
      setUnavailable(prevUnavailable => [...prevUnavailable, removedPlayer]);
    }
    handleFocusChange('remove', removedPlayer.name, '.icon-button:not(.icon-button--update)');
  }

  const addPlayer = (addedPlayer) => {
    setAvailablePlayers(prev => updateAvailablePlayers(prev, { action: 'add', player: addedPlayer }));
    setUnavailable(unavailable.filter((player) => player.name !== addedPlayer.name));
    handleFocusChange('add', addedPlayer.name, '.icon-button--add');
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
        <ul ref={benchedPlayersRef} className="bench__player-list">
          {
            availablePlayers.map((player) =>
              <li className="bench__player-option" key={player.name}>
                <span className="bench__player-name">{player.name}</span>
                <span className={benchPositionClassnames}>
                  <Select player={player} edit={player.name === playerToEdit} handleSelection={setPlayerToEdit}/>
                  <IconButton onClick={() => setPlayerToEdit(player.name)} type="update"/>
                </span>
                <IconButton className={calculateButtonClassName(player.name, 'remove')}
                            onClick={() => removePlayer(player)}
                            type="remove"/>
              </li>)
          }
          {renderSubWarning &&
            <li className="bench__player-option bench__sub-warning">
              <span>SUBS NEEDED</span>
              <IconButton onClick={() => renderSubFormFromBench(true)} type="add"/>
            </li>
          }
        </ul>
      </div>
      <div className="unavailable-list" aria-label="Unavailable players">
        <header className="bench__header">
          <h3 className="bench__subtitle unavailable">Unavailable</h3>
        </header>
        { unavailable.length > 0 && (
          <ul className="bench__player-list" ref={unavailablePlayersRef}>
            { unavailable.map((player) =>
              <li className="bench__player-option unavailable" key={player.name}>
                {player.name}
                <IconButton className={calculateButtonClassName(player.name, 'add')}
                            onClick={() => addPlayer(player)}
                            type="add"/>
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  )
}

Bench.propTypes = {
  renderSubFormFromBench: PropTypes.func.isRequired
};

export default Bench;