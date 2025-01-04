import React, { useState } from "react";
import Bench from './Bench';
import PlayerPositions from "./PlayerPositions";
import playerDataSet from "../util/playerDataSet";

const FieldLineup = ({formation}) => {
	const [availablePlayers, setAvailablePlayers] = useState(playerDataSet),
    [renderForm, setRenderForm] = useState(false),
    [selectedPosition, setSelectedPosition] = useState(''),
		formationArray = formation.split("").map((line) => parseInt(line));

	const updateAvailablePlayers = ( ...actions ) => {
		let availablePlayersCopy = availablePlayers;
		const removePlayer = (playerToRemove, playerArr) => availablePlayersCopy = playerArr.filter((ind) => ind.name !== playerToRemove.name);
		const addPlayer = (playerToAdd, playerArr) => {
			//player to add may not exist in dataset because they're an extra sub
			const playerFromRoster = playerDataSet.find((player) => player.name === playerToAdd.name);
			const playerInfo = playerFromRoster ? playerFromRoster : playerToAdd;
			return availablePlayersCopy = playerArr.concat(playerInfo);
		}
		actions.forEach((update) => update.action === 'remove' 
			? removePlayer(update.player, availablePlayersCopy)
			: addPlayer(update.player, availablePlayersCopy)
		)
		setAvailablePlayers(availablePlayersCopy);
	}
	
	const renderGoalie = (num) => {
		const children= []
		for (let i = 0; i < num; i++) {
			children.push(<PlayerPositions line='goalie'
																		 updateAvailablePlayers={updateAvailablePlayers}
																		 availablePlayers={availablePlayers}
                                     renderSubForm={renderSubForm}/>);
		}
		return children;
	}

	const renderDefense = (num) => {
		const children = []
		for (let i = 0; i < num; i++) {
			children.push(<PlayerPositions line='defense'
																		 index={i}
																		 updateAvailablePlayers={updateAvailablePlayers}
																		 availablePlayers ={availablePlayers}
                                     renderSubForm={renderSubForm}/>);
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
																		 availablePlayers ={availablePlayers}
                                     renderSubForm={renderSubForm}/>);
		}
		else if (num === 2) {
			for (let i = 0; i <= num; i = i + 2) {
				children.push(<PlayerPositions line='midfield'
																			 index={i}
																			 updateAvailablePlayers={updateAvailablePlayers}
																			 availablePlayers ={availablePlayers}
                                       renderSubForm={renderSubForm}/>);
			}
		}
		else {
			for (let i = 0; i < num; i++) {
				children.push(<PlayerPositions line='midfield'
																			 index={i}
																			 updateAvailablePlayers={updateAvailablePlayers}
																			 availablePlayers ={availablePlayers}
                                       renderSubForm={renderSubForm}/>);
			}
		}
		return children;
	}

	const renderAttack = (num) => {
		const children = []
		for (let i = 0; i < num; i++) {
			children.push(<PlayerPositions line='attack'
																		 updateAvailablePlayers={updateAvailablePlayers}
																		 availablePlayers={availablePlayers}
                                     renderSubForm={renderSubForm}/>);
		}
		return children;
	}

  const renderSubForm = (show, position) => {
    console.log(show, position);
    setRenderForm(show);
    position ? setSelectedPosition(position): setSelectedPosition('');
  };
	return (
		// need a name for container holding field & bench
		<div className="container">
      <Bench updateAvailablePlayers={updateAvailablePlayers}
             availablePlayers ={availablePlayers}
             renderForm={renderForm}
             setRenderForm={setRenderForm}
             selectedPosition={selectedPosition}/>
      <div className="field">
        <div className="field__setup">
          {
            formation ?
            <>
              <div className="field__line">{renderGoalie(formationArray[0])}</div>
              <div className="field__line">{renderDefense(formationArray[1])}</div>
              <div className="field__line">{renderMidfield(formationArray[2])}</div>
              <div className="field__line">{renderAttack(formationArray[3])}</div>
            </>
            : <h3 className="field__warning">Please Select a Formation</h3>
          }
        </div>
      </div>
		</div>
	);
}

export default FieldLineup;