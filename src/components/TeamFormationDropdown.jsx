import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import { formations } from '../util/lineupData';

const TeamFormationDropdown = (props) => {
	const { chooseFormation: chooseFormationProp } = props;
  const [open, setOpen] = useState(false);
  const labelId = 'team-formation-label';
  const dropdownRef = useRef(null);

  const handleBlur=(e) => {
		if (!dropdownRef.current.contains(e.relatedTarget)) {
			setOpen(false)
		}
	}

	return (
  <div className= "formation dropdown__form">
    <label htmlFor="dropdown" id={labelId}>Choose a formation:</label>
    <div className="dropdown formation" ref={dropdownRef} onBlur={handleBlur}>
      <Dropdown open={open}
                setOpen={setOpen}
                labelId={labelId}
                options={formations}
                className= "formation"
                updateSelected={chooseFormationProp}
                />
    </div>
  </div>
	);
}

TeamFormationDropdown.propTypes = {
 chooseFormation: PropTypes.func
};

export default TeamFormationDropdown;