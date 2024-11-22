import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons'

const Bench = ({updateAvailablePlayers, availablePlayers}) => {
	const [unavailable, setUnavailable] = useState([]);

	const removePlayer = (player) => {
		setUnavailable([...unavailable, player]);
		updateAvailablePlayers({action: 'remove', player: player.name})
	}
	const addPlayer = (player) => {
		updateAvailablePlayers(undefined, {action: 'add', player: player.name})
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
							<button className="edit-button" onClick={() => removePlayer(player)}>
								<FontAwesomeIcon icon={faX}/>
							</button>
						</li>)
				}
			</ul>
			<h2 className="bench-title">Unavailable</h2>
			<ul className="player-list">
				{
					unavailable.map((player) => 
						<li className="player-bench" key={player.name}>
							{player.name}
							<button className="edit-button" onClick={() => addPlayer(player)}>
								<FontAwesomeIcon icon={faPlus}/>
							</button>
						</li>)
				}
			</ul>
		</div>
	)

}

export default Bench;