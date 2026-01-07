import React from 'react';

import Dropdown2 from './Dropdown2';
import { formations } from '../util/lineupData';

interface DropdownProps {
  chooseFormation: (formation: string) => void;
  selectedFormation?: string;
}

const TeamFormationDropdown = ({ chooseFormation, selectedFormation }: DropdownProps) => {
  const labelId = 'team-formation-label';

	return (
  <div className= "dropdown--formation">
    <label htmlFor="dropdown" id={labelId}>Choose a formation:</label>
    <Dropdown2 labelId={labelId}
              options={formations}
              selectedValue={selectedFormation}
              onSelect={chooseFormation}
              placeholder="select formation"
              autoFocus={true}
              />
  </div>
	);
}

export default TeamFormationDropdown;