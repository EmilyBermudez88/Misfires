import React, { Dispatch, SetStateAction } from 'react';
import Dropdown2 from './Dropdown2';
import { JerseyColourType } from '../App';

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
    <Dropdown2 labelId={labelId}
              options={options}
              selectedValue={jerseyColour}
              onSelect={(option) => chooseJersey(option as JerseyColourType)}
              placeholder="select jersey"
              />
  </div>
	);
}

export default JerseyColourDropdown;
