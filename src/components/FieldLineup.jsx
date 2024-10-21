import React from "react";

const FieldLineup = ({formation}) => {
	const formationArray = formation.split("");

	const renderPositions = (num) => {
		const children = [];
		for (let i = 0; i < num; i++) {
			children.push(<span className="field-position">{num}</span>)
		}
		return children;
	}

	return (
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
	);
}

export default FieldLineup;