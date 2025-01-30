import React, {useState, useEffect, useRef} from 'react';

const Select = ({ player, edit, handleSelection }) => {
  const [availablePositions, setAvailablePositions] = useState([]);
  const [selected, setSelected ]= useState(player.position);
  const selectRef = useRef();

  useEffect(() => {
    const handlePositions = () => {
      let positions = [];
      for(const prop in player) {
        if (prop !== 'name')
          positions.push(player[prop]);
      }
      setAvailablePositions(positions);
    }
    handlePositions();
  }, [player]);

  useEffect(() => {
    edit && selectRef.current.focus();
  },[edit])

  return (
    <>
    { edit ? 
      <select ref={selectRef} id="position-options" name="position-options" onBlur={() => handleSelection('')} onChange={(e) => setSelected(e.target.value)} value={selected}>
        {availablePositions.map((position) => position && <option key={position}>{position}</option> )}
      </select>
      : <span className="bench__player-position">({selected})</span>
    }
    </>
  )
}

export default Select;