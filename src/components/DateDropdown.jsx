import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

const JerseyColourDropdown = ({ chooseJersey }) => {
  const [open, setOpen] = useState(false);
  const labelId = 'jersey-labl';
  const dropdownRef = useRef(null);

  const handleBlur=(e) => {
		if (!dropdownRef.current.contains(e.relatedTarget)) {
			setOpen(false)
		}
	}

  const options = [
    { dropdownValue: 'home' },
    { dropdownValue: 'away' }
  ];

	return (
  <div className= "dropdown--jersey__container">
    <label htmlFor="dropdown" id={labelId}>Home / Away:</label>
    <div className="dropdown dropdown--jersey__select" ref={dropdownRef} onBlur={handleBlur}>
      <Dropdown open={open}
                setOpen={setOpen}
                labelId={labelId}
                options={options}
                selectionType="jersey"
                updateSelected={chooseJersey}
                />
    </div>
  </div>
	);
}

JerseyColourDropdown.propTypes = {
 chooseJersey: PropTypes.func
};

export default JerseyColourDropdown;
