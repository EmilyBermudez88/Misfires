import React, { useEffect, useState } from "react";
import playerDataSet from "../util/playerDataSet";

const Bench = ({findPlayers}) => {
	const [available, setAvailable] = useState(playerDataSet),
		[unavailable, setUnavailable] = useState([]);

	const removePlayer = (player) => {
		setUnavailable([...unavailable, player]);
		const newAvailable = available.filter((ind) => ind !== player);
		setAvailable(newAvailable);
	}
	const addPlayer = (player) => {
		setAvailable([...available, player]);
		const newUnavailable = unavailable.filter((ind) => ind !== player);
		setUnavailable(newUnavailable);
	}

	useEffect(() => {
		findPlayers(available)
	}, [available, findPlayers]);

	return (
		<div className= "bench">
			<h2 className="bench-title">Available</h2>
			<ul className="player-list">
				{
					available.map((player) => 
						<li>
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
						<li>
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