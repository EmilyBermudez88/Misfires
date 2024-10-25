import React, { useState } from "react";
import Bench from './Bench';
import PlayerPositions from "./PlayerPositions";
import playerDataSet from "../util/playerDataSet";

const FieldLineup = ({formation}) => {
	const [availablePlayers, setAvailablePlayers] = useState(playerDataSet),
		formationArray = formation.split("").map((line) => parseInt(line));

	const updateAvailablePlayers = (remove, add) => {
		let removePlayer = []
		removePlayer = remove ? availablePlayers.filter((player) => player.name !== remove.player) : availablePlayers;
		if (add) {
			const findPlayer = playerDataSet.find((player) => player.name === add.player)
			removePlayer = removePlayer.concat(findPlayer)
		}
		setAvailablePlayers(removePlayer)
	}
	
	const renderGoalie = (num) => {
		const children= []
		for (let i = 0; i < num; i++) {
			children.push(<PlayerPositions line='goalie'
																		 updateAvailablePlayers={updateAvailablePlayers}
																		availablePlayers={availablePlayers}/>)
		}
		return children;
	}

	const renderDefense = (num) => {
		const children = []
		for (let i = 0; i < num; i++) {
			children.push(<PlayerPositions line='defense'
																		 index={i}
																		 updateAvailablePlayers={updateAvailablePlayers}
																		 availablePlayers ={availablePlayers}/>);
		}
		if (num === 3) {
			// move centre back position to centre of defense line
			children.splice(1, 0, children.splice(-1)[0])
		}
		return children;
	}

	const renderMidfield = (num) => {
		const children = []
		if (num === 1) {
			children.push(<PlayerPositions line='midfield'
																		 index={num}
																		 updateAvailablePlayers={updateAvailablePlayers}
																		 availablePlayers ={availablePlayers}/>);
		}
		else if (num === 2) {
			for (let i = 0; i <= num; i = i + 2) {
				children.push(<PlayerPositions line='midfield'
																			 index={i}
																			 updateAvailablePlayers={updateAvailablePlayers}
																			 availablePlayers ={availablePlayers}/>);
			}
		}
		else {
			for (let i = 0; i < num; i++) {
				children.push(<PlayerPositions line='midfield'
																			 index={i}
																			 updateAvailablePlayers={updateAvailablePlayers}
																			 availablePlayers ={availablePlayers}/>);
			}
		}
		return children;
	}

	const renderAttack = (num) => {
		const children = []
		for (let i = 0; i < num; i++) {
			children.push(<PlayerPositions line='attack'
																		 updateAvailablePlayers={updateAvailablePlayers}
																		 availablePlayers={availablePlayers}/>)
		}
		return children;
	}

	return (
		// need a name for container holding field & bench
		<div className="container">
			<div className="field">
				{
					availablePlayers && 
					<>
						<div className="field-line">{renderGoalie(formationArray[0])}</div>
						<div className="field-line">{renderDefense(formationArray[1])}</div>
						<div className="field-line">{renderMidfield(formationArray[2])}</div>
						<div className="field-line">{renderAttack(formationArray[3])}</div>
					</>
				}
			</div>
			<Bench updateAvailablePlayers={updateAvailablePlayers} availablePlayers ={availablePlayers}/>
		</div>
	);
}

export default FieldLineup;