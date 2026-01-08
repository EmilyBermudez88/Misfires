import React, { useState, useRef, useContext, useEffect } from 'react';
import classnames from 'classnames';

import IconButton from './IconButton';
import Select from './Select';
import Toggle from './Toggle';

import { updateAvailablePlayers, calculateButtonClassName } from '../utils/playerUtils';
import { PlayersContext } from '../contexts/PlayersContext';
import { FormationContext } from '../contexts/FormationContext';
import { PlayerType, AvailablePositions } from '../types/types';

interface BenchProps {
  renderSubFormFromBench: (show: boolean, position?: AvailablePositions) => void;
}

const Bench = ({ renderSubFormFromBench }: BenchProps) => {
  const [unavailable, setUnavailable] = useState<PlayerType[]>([]);
  const [showPlayerPosition, setShowPlayerPosition] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState<string | null>(null);

  const { setAvailablePlayers, availablePlayers } = useContext(PlayersContext);
  const { formation } = useContext(FormationContext);

  const renderSubWarning = availablePlayers.length < 4;

  const benchPositionClassnames = classnames('bench__position-container', {
    hidden: !showPlayerPosition
  });

  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const setButtonRef = (key: string, el: HTMLButtonElement | null) => {
      if (el) {
        buttonRefs.current.set(key, el);
      } else {
        buttonRefs.current.delete(key);
      }
    }

  const handleFocusChange = (playerName: string, playerList: PlayerType[]): void => {
    const btnIdx = playerList.findIndex(player => player.name === playerName);
    //If button is last in array, focus on the previous button. Otherwise, focus on next button
    const nextPlayer =
      btnIdx === playerList.length - 1
        ? playerList[btnIdx - 1]
        : playerList[btnIdx + 1];

    console.log(btnIdx, nextPlayer);

    if (nextPlayer) {
     const btnToFocus = buttonRefs.current.get(nextPlayer.name);
     btnToFocus?.focus();
    }
  }

  const removePlayer = (removedPlayer: PlayerType) => {
    handleFocusChange(removedPlayer.name, availablePlayers);
    setAvailablePlayers(prev => updateAvailablePlayers(prev, { action: 'remove', player: removedPlayer }));
    if (!removedPlayer.sub) {
      setUnavailable(prev => [...prev, removedPlayer]);
    }
  }

  const addPlayer = (addedPlayer: PlayerType) => {
    handleFocusChange(addedPlayer.name, unavailable);
    setAvailablePlayers(prev => updateAvailablePlayers(prev, { action: 'add', player: addedPlayer }));
    setUnavailable(unavailable.filter((player) => player.name !== addedPlayer.name));
  }

  useEffect(() => {
    setUnavailable([]);
  }, [formation]);

  return (
    <section className="bench">
      <h2 className="bench__title">Bench</h2>
      <div className="available-list">
        <Toggle showValue={showPlayerPosition} setShowValue={setShowPlayerPosition}/>
        <ul className="bench__player-list">
          {
            availablePlayers.map((player) =>
              <li className="bench__player-option" key={player.name}>
                <span className="bench__player-name">{player.name}</span>
                <span className={benchPositionClassnames}>
                  <Select player={player} edit={player.name === playerToEdit} handleSelection={setPlayerToEdit}/>
                  <IconButton onClick={() => setPlayerToEdit(player.name)} type="update"/>
                </span>
                <IconButton ref={(el) => setButtonRef(player.name, el)}
                            className={calculateButtonClassName(player.name)}
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
          <ul className="bench__player-list">
            { unavailable.map((player) =>
              <li className="bench__player-option unavailable" key={player.name}>
                {player.name}
                <IconButton ref={(el) => setButtonRef(player.name, el)}
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

export default Bench;