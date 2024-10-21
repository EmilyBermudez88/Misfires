import React, { useState } from "react";
import Bench from './Bench';

const FieldLineup = ({formation}) => {
	const [players, setPlayers] = useState([]),
		formationArray = formation.split("");

	const renderPositions = (num) => {
		const children = [];
		for (let i = 0; i < num; i++) {
			children.push(<span className="field-position"> + </span>)
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
				{
					formationArray.map((line) => {
						return (
							<div className="field-line">
								{renderPositions(parseInt(line))}
							</div>
						)
					})
				}
			</div>
			<Bench findPlayers={findPlayers}/>
		</div>
	);
}

export default FieldLineup;