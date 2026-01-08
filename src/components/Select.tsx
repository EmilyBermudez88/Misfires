import React, { useState, useEffect, useRef, useContext } from 'react';

import { PlayersContext } from '../contexts/PlayersContext';
import { AvailablePositions, PlayerType } from '../types/types';

interface SelectProps {
  player: PlayerType;
  edit: boolean;
  handleSelection: (name: string | null) => void;
}

const Select = ({ player, edit, handleSelection }: SelectProps) => {
  const [availablePlayerPositions, setAvailablePlayerPositions] = useState<AvailablePositions[]>([]);
  const [selected, setSelected]= useState<AvailablePositions>(player.position[0]);
  const selectRef = useRef<HTMLSelectElement>(null);
  const { formationPositions } = useContext(PlayersContext);

  useEffect(() => {
    const handlePositions = () => {
      const positions: AvailablePositions[] = [...player.position];
      if (player.backupPosition) {
        positions.push(player.backupPosition);
      }
      setAvailablePlayerPositions(positions);
    }
    handlePositions();
  }, [player]);

  useEffect(() => {
    edit && selectRef.current?.focus();
  }, [edit])

  return (
    <>
      { edit ?
        <select ref={selectRef}
                id="position-options"
                className="bench__position-options"
                name="position-options"
                onBlur={() => handleSelection(null)}
                onChange={(e) => setSelected(e.target.value as AvailablePositions)}
                value={selected}>
          {player.sub
            ? formationPositions.map((position) => <option key={position}>{position}</option>)
            : availablePlayerPositions.map((position) => position && <option key={position}>{position}</option>)
          }
        </select>
      : <span className="bench__player-position">({selected})</span>
    }
    </>
  )
}

export default Select;