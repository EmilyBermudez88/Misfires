import React from 'react';
import Dropdown from './Dropdown';
import { JerseyColourType } from '../types/types';

interface DropdownProps {
  chooseJersey: (color: JerseyColourType) => void;
  jerseyColour: JerseyColourType;
}

const JerseyColourDropdown = ({ chooseJersey, jerseyColour }: DropdownProps) => {
  const labelId = 'jersey-labl';
  const options: JerseyColourType[] = ['away', 'home'];

	return (
  <div className= "dropdown--jersey">
    <label htmlFor="dropdown" id={labelId}>Choose Jersey:</label>
    <Dropdown labelId={labelId}
              options={options}
              selectedValue={jerseyColour}
              onSelect={(option) => chooseJersey(option as JerseyColourType)}
              placeholder="select jersey"
              />
  </div>
	);
}

export default JerseyColourDropdown;
