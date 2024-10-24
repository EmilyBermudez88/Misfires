import React, { useState } from "react";
// import playerDataSet from "../util/playerDataSet";

const Bench = ({updateAvailablePlayers, availablePlayers}) => {
	//available is going to be determined by fieldLineup
	// it also needs access to full set playerData to establish UNAVAILABLE
	// const [available, setAvailable] = useState(playerDataSet),
	const [unavailable, setUnavailable] = useState([]);

	const removePlayer = (player) => {
		setUnavailable([...unavailable, player]);
		// const newAvailable = availablePlayers.filter((ind) => ind !== player);
		// setAvailable(newAvailable);
		updateAvailablePlayers(player.name)
	}
	const addPlayer = (player) => {
		// setAvailable([...availablePlayers, player]);
		// const newUnavailable = unavailable.filter((ind) => ind !== player);
		// setUnavailable(newUnavailable);
		console.log(player);
	}

	// useEffect(() => {
	// 	updateAvailablePlayers(available)
	// }, [available, updateAvailablePlayers]);

	return (
		<div className= "bench">
			<h2 className="bench-title">Available</h2>
			<ul className="player-list">
				{
					availablePlayers.map((player) => 
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