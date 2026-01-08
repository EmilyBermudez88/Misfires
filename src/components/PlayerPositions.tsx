import React, { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';

import Dropdown from './Dropdown';
import JerseyRed from '../assets/JerseyRed.png';
import JerseyWhite from '../assets/JerseyWhite.png'

import { PlayersContext } from '../contexts/PlayersContext';
import { FormationContext } from '../contexts/FormationContext';
import { JerseyContext } from '../contexts/JerseyContext';
import { updateAvailablePlayers, calculateDropdownOptions } from '../utils/playerUtils';
import { PlayerType, AvailablePositions, UpdateAvailableAction } from '../types/types';

interface PlayerPositionsProps {
  position: AvailablePositions;
  renderSubForm: (show: boolean, position: AvailablePositions | undefined) => void;
}

const PlayerPositions = React.memo(({ position, renderSubForm }: PlayerPositionsProps) => {
  const { availablePlayers, setAvailablePlayers } = useContext(PlayersContext);
  const { formationString } = useContext(FormationContext);
  const { jerseyColour } = useContext(JerseyContext);
  const [userSelection, setUserSelection] = useState<PlayerType | null>(null);

	const labelId = `field-position-${position}`;
  const jerseyImg = jerseyColour === 'away' ? JerseyWhite : JerseyRed;
  const titleClassName = classnames('field-position__title', {
    away: jerseyColour === 'away'
  });

  const getDropodownOptions = calculateDropdownOptions(availablePlayers, position);

  const handleSelection = (selection: string) => {
    const newPlayer = availablePlayers.find((player) => player.name === selection);

    if (newPlayer) {
      setAvailablePlayers(prev => {
        const actions: UpdateAvailableAction[] = [{ action: 'remove', player: newPlayer }];
        if (userSelection) {
          actions.push({ action: 'add', player: userSelection })
        }
        return updateAvailablePlayers(prev, ...actions);
      });
      setUserSelection(newPlayer);
    }
  };

  const reset = () => {
    if (userSelection) {
      setAvailablePlayers((prev) =>
        updateAvailablePlayers(prev, { action: 'add', player: userSelection }));
      setUserSelection(null);
    }
  };

  const emptyState = (
    <li className="dropdown__option--warning">
      <span>NO ONE AVAILABLE</span>
      <button className="dropdown__button--warning" onClick={() => renderSubForm(true, position)}>Add Sub</button>
    </li>
  );

  useEffect(() => {
    setUserSelection(null)
  }, [formationString])

	return (
  <div className="field-position">
    <div className="field-position__icon-container">
      <img role="presentation" src={jerseyImg} className="field-position__icon"/>
      <p className={titleClassName} id={labelId}>{position}</p>
      <Dropdown className={!userSelection ? 'unselected' : ''}
                labelId={labelId}
                options={getDropodownOptions}
                selectedValue={userSelection?.name || ''}
                onSelect={handleSelection}
                placeholder="select player"
                emptyState={emptyState}
                renderResetBtn={!!userSelection}
                reset={reset}
                />
    </div>
  </div>
	);
});

export default PlayerPositions;
