import React, { useState } from 'react';

const AddSubForm = ({onSubmit: onSubmitProp, selectedPosition, formationPostions, setRenderForm}) => {
  const defaultPosition = selectedPosition ? selectedPosition : '';
  const [addSub, setAddSub] = useState({name:'', position: defaultPosition});
  const handleFormChange = (value, key) => setAddSub({...addSub, [key]: value});

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitProp(addSub);
    setRenderForm(false);
    setAddSub({name:'', position:''});
  }

  const onCancel = () => {
    setAddSub({name:'', position:''});
    setRenderForm(false);
  }

  return (
    <form aria-label='Add a Sub' onSubmit= {onSubmit}>
        <div className="sub-form-group">
          <label htmlFor="sub-name">Player Name</label>
          <input id="sub-name" type="text" onChange={(e) => handleFormChange(e.target.value, 'name')} value={addSub.name}/>
        </div>
        <div className="sub-form-group">
          <label htmlFor="sub-position">Player Position</label>
          <select id="sub-position" name="sub-position" onChange={(e) => handleFormChange(e.target.value, 'position')} value={addSub.position}>
            <option value="">Choose a Position</option>
            {formationPostions.map((position) => <option key={position}>{position}</option> )}
          </select>
        </div>
        <button className="button--form">Add Player</button>
        <button className="button--form" type="reset" onClick={onCancel}>Cancel</button>
      </form>
  )
}

export default AddSubForm;