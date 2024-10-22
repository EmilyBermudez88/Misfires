import React, { useState } from "react";
import Bench from './Bench';

const positions = [
	'goalie', ['right back', 'left back', 'centre back'], ['right wing', 'midfield', 'left wing'], 'striker'
]

const FieldLineup = ({formation}) => {
	const [players, setPlayers] = useState([]),
		formationArray = formation.split("").map((line) => parseInt(line));

	const renderDefense = (num) => {
		const children = []
		for (let i = 0; i < num; i++) {
			children.push(<span className="field-position">{positions[1][i]}</span>)
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
			children.push(<span className="field-position">{positions[2][num]}</span>)
		}
		else if (num === 2) {
			for (let i = 0; i <= num; i = i + 2) {
				children.push(<span className="field-position">{positions[2][i]}</span>)
			}
		}
		else {
			for (let i = 0; i < num; i++) {
				children.push(<span className="field-position">{positions[2][i]}</span>)
			}
		}
		return children;
	}

	const renderAttack = (num) => {
		const children = []
		for (let i = 0; i < num; i++) {
			children.push(<span className="field-position">{positions[3]}</span>)
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
				<div className="field-line">
					<span className="field-position">{positions[0]}</span>
				</div>
				<div className="field-line">{renderDefense(formationArray[1])}</div>
				<div className="field-line">{renderMidfield(formationArray[2])}</div>
				<div className="field-line">{renderAttack(formationArray[3])}</div>
			</div>
			<Bench findPlayers={findPlayers}/>
		</div>
	);
}

export default FieldLineup;