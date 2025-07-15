import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { PlayersContext } from '../contexts/PlayersContext';

const Select = ({ player, edit, handleSelection }) => {
  const [availablePlayerPositions, setAvailablePlayerPositions] = useState([]);
  const [selected, setSelected]= useState(player.position[0]);
  const selectRef = useRef();
  const { formationPositions } = useContext(PlayersContext);

  useEffect(() => {
    const handlePositions = () => {
      let positions = [];
      for(const prop in player) {
        if (prop !== 'name')
          // eslint-disable-next-line curly
          if (typeof player[prop] === 'string') {
            positions.push(player[prop]);
          } else if (typeof player[prop] === 'object') {
            positions.push(...player[prop]);
          }
        }
      setAvailablePlayerPositions(positions);
    }
    handlePositions();
  }, [player]);

  useEffect(() => {
    edit && selectRef.current.focus();
  }, [edit])

  return (
    <>
      { edit ?
        <select ref={selectRef}
                id="position-options"
                className="bench__position-options"
                name="position-options"
                onBlur={() => handleSelection('')}
                onChange={(e) => setSelected(e.target.value)}
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

const player = PropTypes.shape({
  name: PropTypes.string,
  position: PropTypes.arrayOf(PropTypes.string),
  backupPosition: PropTypes.string,
  sub: PropTypes.bool
})

Select.propTypes = {
  player: player,
  edit: PropTypes.bool,
  handleSelection: PropTypes.func
};

export default Select;