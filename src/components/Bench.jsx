import React, { useState } from 'react';
import AddSubForm from './AddSubForm';
import { EditButton } from './EditButton';

const Bench = ({updateAvailablePlayers, availablePlayers}) => {
	const [unavailable, setUnavailable] = useState([]);
	const [showSubForm, setShowSubForm] = useState(false);
  const renderSubWarning = availablePlayers.length < 2;
  const renderSubButton = renderSubWarning && !showSubForm;

	const removePlayer = (player) => {
    //PASSES FULL PLAYER
		setUnavailable([...unavailable, player]);
		updateAvailablePlayers({action: 'remove', name: player.name})
	}
	const addPlayer = (player) => {
    //PASSES FULL PLAYER
		updateAvailablePlayers({action: 'add', name: player.name})
		setUnavailable(unavailable.filter((ind) => ind.name !== player.name))
	}

  const onSubmit = (addSubProp) => {
    setShowSubForm(false);
    updateAvailablePlayers({action: 'add', ...addSubProp});
  }
	
	return (
		<div className="bench">
			<h2 className="bench__title">Available</h2>
			<ul className="bench__player-list">
				{
					availablePlayers.map((player) => 
						<li className="bench__player-option" key={player.name}>
							{player.name}
							<EditButton onClick={() => removePlayer(player)} type="remove" />
						</li>)
				}
			</ul>
			{renderSubWarning && <p>WARNING: more subs needed</p> }
      {renderSubButton && <button onClick={() => setShowSubForm(true)}>Add A Sub</button>}
      {showSubForm && <AddSubForm onSubmit={onSubmit} />}
			<h2 className="bench__title">Unavailable</h2>
			<ul className="bench__player-list">
				{
					unavailable.map((player) => 
						<li className="bench__player-option" key={player.name}>
							{player.name}
							<EditButton onClick={() => addPlayer(player)} type="add" />
						</li>)
				}
			</ul>
		</div>
	)
}

export default Bench;