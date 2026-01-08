import React, { useContext } from 'react';

import Dropdown from './Dropdown';

import { PlayersContext } from '../contexts/PlayersContext';
import { FormationContext } from '../contexts/FormationContext';
import { formations } from '../utils/lineupData';
import playerDataSet from '../utils/playerDataSet';

const TeamFormationDropdown = () => {
  const { setAvailablePlayers } = useContext(PlayersContext);
  const { formationString, setFormation, setFormationString } = useContext(FormationContext);
  const labelId = 'team-formation-label';

  const chooseFormation = (selection: string) => {
    const formationArr = selection.split(' - ').map((line) => parseInt(line));
    setFormation(formationArr);
    setFormationString(selection);
    setAvailablePlayers(playerDataSet);
  };

	return (
  <div className= "dropdown--formation">
    <label htmlFor="dropdown" id={labelId}>Choose a formation:</label>
    <Dropdown labelId={labelId}
              options={formations}
              selectedValue={formationString}
              onSelect={chooseFormation}
              placeholder="select formation"
              autoFocus={true}
              />
  </div>
	);
}

export default TeamFormationDropdown;