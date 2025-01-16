import React, { useState } from 'react';
import AddSubForm from './AddSubForm';
import { EditButton } from './EditButton';

const Bench = ({updateAvailablePlayers, availablePlayers, renderForm, setRenderForm, selectedPosition, formationPositions }) => {
	const [unavailable, setUnavailable] = useState([]);
  const renderSubWarning = availablePlayers.length < 2;
  const renderSubButton = renderSubWarning && !renderForm;

	const removePlayer = (removedPlayer) => {
		setUnavailable([...unavailable, removedPlayer]);
		updateAvailablePlayers({action: 'remove', player: removedPlayer})
	}
	const addPlayer = (addedPlayer) => {
		updateAvailablePlayers({action: 'add', player: addedPlayer})
		setUnavailable(unavailable.filter((ind) => ind.name !== addedPlayer.name))
	}

  const onSubmit = (addSubProp) => {
    setRenderForm(false);
    updateAvailablePlayers({action: 'add', player: addSubProp});
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
      {renderSubButton && <button onClick={() => setRenderForm(true)}>Add A Sub</button>}
      {renderForm && <AddSubForm formationPostions={formationPositions} onSubmit={onSubmit} selectedPosition={selectedPosition} setRenderForm={setRenderForm} />}
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