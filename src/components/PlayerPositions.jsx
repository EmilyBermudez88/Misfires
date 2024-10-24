import React, { useEffect, useState } from "react";
import players from '../util/playerDataSet';

const positions = {
    goalie: 'goalie',
    defense: ['right back', 'left back', 'centre back'],
    midfield: ['right winger', 'midfielder', 'left winger'],
    attack: 'striker'
}

const PlayerPositions = ({line, index, availablePlayers}) => {
	const [preferredPlayers, setPreferredPlayers] = useState([]),
		[secondaryPlayers, setSecondaryPlayer] = useState([]),
		[tertiaryPlayers, setTertiaryPlayers] = useState([]),
		position = index === undefined ? positions[line]
			: positions[line][index],
		renderTertiary = !secondaryPlayers.length && !preferredPlayers.length;

	useEffect(() => {
		setPreferredPlayers(players.filter((player) => player.position === position));
		setSecondaryPlayer(players.filter((player) => player.secondPosition === position));
		setTertiaryPlayers(players.filter((player) => player.thirdPosition === position));
	}, [position])

	return (
		<>
			<label htmlFor="field-position-dropdown">{position}</label>
			<select
				className= "field-position-dropdown"
				name="field-position-dropdown"
				id="field-position-dropdown"
				onChange={(e) => availablePlayers(e.target.value)}>
					<option className="player-option" value="">select player</option>
					{
						preferredPlayers.length &&
							<optgroup label="First Choices">
								{ 
									preferredPlayers.map((player) => 
									<option className="player-option" key={player.name}>{player.name}</option>)
								}
							</optgroup>
					}
					{
						secondaryPlayers.length &&
							<optgroup label="Second Choices">
								{ 
									secondaryPlayers.map((player) => 
									<option className="player-option" key={player.name}>{player.name}</option>)
								}
							</optgroup>
					}
					{
						renderTertiary.length &&
							<optgroup label="Third Choices">
								{ 
									tertiaryPlayers.map((player) => 
									<option className="player-option" key={player.name}>{player.name}</option>)
								}
							</optgroup>
					}
			</select>
		</>
	);
};

export default PlayerPositions;