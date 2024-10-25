import React, { useState } from "react";

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
						<li key={player.name}>
							<button className="player-bench" onClick={() => removePlayer(player)}>
								{player.name}
							</button>
						</li>)
				}
			</ul>
			<h2 className="bench-title">Unavailable</h2>
			<ul className="player-list">
				{
					unavailable.map((player) => 
						<li key={player.name}>
							<button className="player-bench" onClick={() => addPlayer(player)}>
								{player.name}
							</button>
						</li>)
				}
			</ul>
		</div>
	)

}

export default Bench;