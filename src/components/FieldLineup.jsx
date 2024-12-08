import React, { useState } from "react";
import Bench from './Bench';
import PlayerPositions from "./PlayerPositions";
import playerDataSet from "../util/playerDataSet";

const FieldLineup = ({formation}) => {
	const [availablePlayers, setAvailablePlayers] = useState(playerDataSet),
		formationArray = formation.split("").map((line) => parseInt(line));
		console.log(formationArray, formationArray.length)

	const updateAvailablePlayers = (remove, add) => {
		// review name : exists in availablePlayers ? filter out : concat 

		// console.log(actions)
		// const test = actions.map((type) => type.action === 'remove' ? availablePlayers.filter((player) => player.name !== type.player) 
		// 	: availablePlayers.concat(playerDataSet.find((person) => person.name === type.player)))
		// console.log(test)

		// const finalUpdate = actions.map((action) => {
			// let updated = []
			// updated = action.action === 'remove' ? availablePlayers.filter((player) => player.name !== action.player)
			// 	: action.action === 'add' ? [...availablePlayers, playerDataSet.find((player) => player.name === action.player)]
			// 	: [...availablePlayers]
			// if (action.action === 'remove') {
			// 	updated = availablePlayers.filter((player) => player.name !== action.player);
			// 	setAvailablePlayers(updated)
			// }
			// else {
			// 	const addedPlayer = playerDataSet.find((player) => player.name === action.player)
			// 	updated = [...availablePlayers, addedPlayer]
			// 	console.log(updated)
			// 	setAvailablePlayers(updated)
			// }
			// return updated;
		// 	setAvailablePlayers(updated);
		// })

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
			<Bench updateAvailablePlayers={updateAvailablePlayers} availablePlayers ={availablePlayers}/>
			<div className="field">
				<div className="field-setup">
					{
						formation ?
						<>
							<div className="field-line">{renderGoalie(formationArray[0])}</div>
							<div className="field-line">{renderDefense(formationArray[1])}</div>
							<div className="field-line">{renderMidfield(formationArray[2])}</div>
							<div className="field-line">{renderAttack(formationArray[3])}</div>
						</>
						: <h3 className="field-warning">Please Select a Formation</h3>
					}
				</div>
			</div>
		</div>
	);
}

export default FieldLineup;