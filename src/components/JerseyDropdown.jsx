import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

const JerseyColourDropdown = ({ chooseJersey }) => {
  const labelId = 'jersey-labl';

  const options = [
    { dropdownValue: 'home' },
    { dropdownValue: 'away' }
  ];

	return (
  <div className= "dropdown--jersey__container">
    <label htmlFor="dropdown" id={labelId}>Choose Jersey:</label>
    <Dropdown labelId={labelId}
              options={options}
              selectionType="jersey"
              updateSelected={chooseJersey}
              />
  </div>
	);
}

JerseyColourDropdown.propTypes = {
 chooseJersey: PropTypes.func
};

export default JerseyColourDropdown;
