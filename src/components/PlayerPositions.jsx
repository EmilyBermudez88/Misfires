import React, { useEffect, useState } from "react";

const positions = {
    goalie: 'goalie',
    defense: ['right back', 'left back', 'centre back'],
    midfield: ['right winger', 'midfielder', 'left winger'],
    attack: 'striker'
}

const PlayerPositions = ({line, index, updateAvailablePlayers, availablePlayers}) => {
	// We still want to parse the availablePlayers array into preferred positions to
	// make the choice easier of which player should go where
	const [preferredPlayers, setPreferredPlayers] = useState([]),
		[secondaryPlayers, setSecondaryPlayer] = useState([]),
		[tertiaryPlayers, setTertiaryPlayers] = useState([]),
		[selectedPlayer, setSelectedPlayer] = useState('select player'),
		position = index === undefined ? positions[line]
			: positions[line][index],
		renderTertiary = !secondaryPlayers.length && !preferredPlayers.length;

	useEffect(() => {
		setPreferredPlayers(availablePlayers.filter((player) => player.position === position));
		setSecondaryPlayer(availablePlayers.filter((player) => player.secondPosition === position));
		setTertiaryPlayers(availablePlayers.filter((player) => player.thirdPosition === position));
	}, [position, availablePlayers])

	const handleOnChange = (e) => {
		updateAvailablePlayers(e.target.value);
		setSelectedPlayer(e.target.value);
	}

	return (
		<>
			<label htmlFor="field-position-dropdown">{position}</label>
			<select
				className= "field-position-dropdown"
				name="field-position-dropdown"
				id="field-position-dropdown"
				onChange={handleOnChange}
				value={selectedPlayer}>
					<option className="player-option">{selectedPlayer}</option>
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
