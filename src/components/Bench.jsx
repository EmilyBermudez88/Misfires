import React, { useState } from 'react';
import { EditButton } from './EditButton';

const Bench = ({updateAvailablePlayers, availablePlayers}) => {
	const [unavailable, setUnavailable] = useState([]);

	const removePlayer = (player) => {
		setUnavailable([...unavailable, player]);
		updateAvailablePlayers({action: 'remove', player: player.name})
	}
	const addPlayer = (player) => {
		updateAvailablePlayers({action: 'add', player: player.name})
		setUnavailable(unavailable.filter((ind) => ind.name !== player.name))
	}

	return (
		<div className= "bench">
			<h2 className="bench-title">Available</h2>
			<ul className="player-list">
				{
					availablePlayers.map((player) => 
						<li className="player-bench" key={player.name}>
							{player.name}
							<EditButton onClick={() => removePlayer(player)} type="remove" />
						</li>)
				}
			</ul>
			<h2 className="bench-title">Unavailable</h2>
			<ul className="player-list">
				{
					unavailable.map((player) => 
						<li className="player-bench" key={player.name}>
							{player.name}
							<EditButton onClick={() => addPlayer(player)} type="add" />
						</li>)
				}
			</ul>
		</div>
	)

}

export default Bench;