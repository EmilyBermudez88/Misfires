import React, { useState } from "react";
import Bench from './Bench';
import PlayerPositions from "./PlayerPositions";

const FieldLineup = ({formation}) => {
	const [players, setPlayers] = useState([]),
		formationArray = formation.split("").map((line) => parseInt(line));

	const renderGoalie = () => {
		return <PlayerPositions line="goalie" availablePlayers={updateAvailablePlayers}/>
	}

	const updateAvailablePlayers = (assigned) => {
		console.log(assigned);
		const update = players.filter((player) => player.name !== assigned)
		setPlayers(update);
		console.log(update, players);
	}

	const renderDefense = (num) => {
		const children = []
		for (let i = 0; i < num; i++) {
			children.push(<PlayerPositions line='defense'index={i} availablePlayers={updateAvailablePlayers}/>);
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
			children.push(<PlayerPositions line='midfield'index={num} availablePlayers={updateAvailablePlayers}/>);
		}
		else if (num === 2) {
			for (let i = 0; i <= num; i = i + 2) {
				children.push(<PlayerPositions line='midfield'index={i} availablePlayers={updateAvailablePlayers}/>);
			}
		}
		else {
			for (let i = 0; i < num; i++) {
				children.push(<PlayerPositions line='midfield' index={i} availablePlayers={updateAvailablePlayers}/>);
			}
		}
		return children;
	}

	const renderAttack = (num) => {
		const children = []
		for (let i = 0; i < num; i++) {
			children.push(<PlayerPositions line='attack'availablePlayers={updateAvailablePlayers}/>)
		}
		return children;
	}
	const findPlayers = (list) => {
		setPlayers(list);
	};

	return (
		// need a name for container holding field & bench
		<div className="container">
			<div className="field">
				<div className="field-line">{renderGoalie()}</div>
				<div className="field-line">{renderDefense(formationArray[1])}</div>
				<div className="field-line">{renderMidfield(formationArray[2])}</div>
				<div className="field-line">{renderAttack(formationArray[3])}</div>
			</div>
			<Bench findPlayers={findPlayers}/>
		</div>
	);
}

export default FieldLineup;