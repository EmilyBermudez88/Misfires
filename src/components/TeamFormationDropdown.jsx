import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import { formations } from '../util/lineupData';

const TeamFormationDropdown = (props) => {
	const { chooseFormation: chooseFormationProp } = props;
  const labelId = 'team-formation-label';

	return (
  <div className= "dropdown--formation__container">
    <label htmlFor="dropdown" id={labelId}>Choose a formation:</label>
    <Dropdown labelId={labelId}
              options={formations}
              selectionType="formation"
              updateSelected={chooseFormationProp}
              />
  </div>
	);
}

TeamFormationDropdown.propTypes = {
 chooseFormation: PropTypes.func
};

export default TeamFormationDropdown;