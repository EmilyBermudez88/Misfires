import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import { AvailablePositions } from '../App';

const Select = ({ player, edit, handleSelection }) => {
  const [availablePlayerPositions, setAvailablePlayerPositions] = useState([]);
  const [selected, setSelected]= useState(player.position);
  const selectRef = useRef();
  // const { formationPositions } = useContext(AvailablePositions);
  // console.log(formationPositions);

  useEffect(() => {
    const handlePositions = () => {
      let positions = [];
      for(const prop in player) {
        if (prop !== 'name')
          {positions.push(player[prop]);}
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
                name="position-options"
                onBlur={() => handleSelection('')}
                onChange={(e) => setSelected(e.target.value)}
                value={selected}>
          {availablePlayerPositions.map((position) => position && <option key={position}>{position}</option>)}
        </select>
      : <span className="bench__player-position">({selected})</span>
    }
    </>
  )
}

const player = PropTypes.shape({
  name: PropTypes.string,
  position: PropTypes.string,
  secondPosition: PropTypes.string,
  thirdPosition: PropTypes.string
})

Select.propTypes = {
  player: player,
  edit: PropTypes.bool,
  handleSelection: PropTypes.func
};

export default Select;