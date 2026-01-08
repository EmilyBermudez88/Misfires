import React, { useContext } from 'react';
import Dropdown from './Dropdown';

import { JerseyContext } from '../contexts/JerseyContext';
import { JerseyColourType } from '../types/types';

const JerseyColourDropdown = () => {
  const { jerseyColour, setJerseyColour } = useContext(JerseyContext);
  const labelId = 'jersey-labl';
  const options: JerseyColourType[] = ['away', 'home'];

	return (
  <div className= "dropdown--jersey">
    <label htmlFor="dropdown" id={labelId}>Choose Jersey:</label>
    <Dropdown labelId={labelId}
              options={options}
              selectedValue={jerseyColour}
              onSelect={(option) => setJerseyColour(option as JerseyColourType)}
              placeholder="select jersey"
              />
  </div>
	);
}

export default JerseyColourDropdown;
