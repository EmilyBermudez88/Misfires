import React, { useState } from 'react';
import { positions } from '../util/lineupData';


const AddSubForm = ({onSubmit: onSubmitProp}) => {
  const [addSub, setAddSub] = useState({name:'', position:''});
  const positionsArray = Object.values(positions).flat();

  const handleFormChange = (value, key) => setAddSub({...addSub, [key]: value});

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitProp(addSub);
    setAddSub({name:'', position:''});
  }

  return (
    <form aria-label='Add a Sub' onSubmit= {onSubmit}>
        <div className="sub-form-group">
          <label htmlFor="sub-name">Player Name</label>
          <input id="sub-name" type="text" onChange={(e) => handleFormChange(e.target.value, 'name')} value={addSub.name}/>
        </div>
        <div className="sub-form-group">
          <label htmlFor="sub-position">Player Position</label>
          <select id="sub-position" name="sub-position" onChange={(e) => handleFormChange(e.target.value, 'position')}>
            <option value="">Choose a Position</option>
            {positionsArray.map((position) => <option key={position}>{position}</option>)}
          </select>
        </div>
        <button className="button--form">Add Player</button>
        <button className="button--form" type="reset">Cancel</button>
      </form>
  )
}

export default AddSubForm;