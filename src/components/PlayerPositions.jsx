import React, { useEffect, useState, useId, useRef } from "react";
import { EditButton } from "./EditButton";

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
		[backupPlayers, setBackupPlayers] = useState([]),
		[selectedPlayer, setSelectedPlayer] = useState('select player'),
		[open, setOpen] = useState(false),
		[visualSelectionIndex, setVisualSelectionIndex] = useState(null),
		position = index === undefined ? positions[line]
			: positions[line][index],
		renderTertiary = !preferredPlayers.length,
		renderClearSelection = selectedPlayer !== 'select player';

	const dropdownId = useId();
	const menuId= useId();
	const optionId = useId();
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const activeDescendent = visualSelectionIndex !== null ? `${optionId}${visualSelectionIndex}` : null;
	const labelId = `field-position-${position}`;

	useEffect(() => {
		setPreferredPlayers(availablePlayers.filter((player) => player.position === position || player.secondPosition === position));
		setBackupPlayers(availablePlayers.filter((player) => player.thirdPosition === position));
	}, [position, availablePlayers])

	const handleSelection = (selected) => {
		selectedPlayer !== 'select player' ? 
			updateAvailablePlayers({action:'remove', player: selected}, {action:'add', player: selectedPlayer})
			: updateAvailablePlayers({action:'remove', player: selected});
		setSelectedPlayer(selected);
		setVisualSelectionIndex(null);
		setOpen(false);
		handleFocus();
	}

	const handleOnKeyDown = (e) => {
		console.log(selectedPlayer, preferredPlayers, e.key, visualSelectionIndex)
		const openKeys = [' ', 'ArrowDown', 'ArrowUp', 'Enter', 'Home', 'End'];
		if (!open && openKeys.includes(e.key)) {
			e.preventDefault();
			setOpen(true)
			if (e.key === 'ArrowUp'|| e.key === 'Home') {
				setVisualSelectionIndex(0)
			}
			else if (e.key ==='End') {
				setVisualSelectionIndex(preferredPlayers.length - 1)
			}
			else {
				setVisualSelectionIndex(null)
			}
		}
		else if (open) {
			switch (e.key) {
				case 'Escape':
					setOpen(false)
					break
				case'ArrowDown':
					if (visualSelectionIndex === null) {
						setVisualSelectionIndex(0)
					}
					else if (preferredPlayers.length && (visualSelectionIndex === 0 || visualSelectionIndex < preferredPlayers.length - 1)) {
						setVisualSelectionIndex(visualSelectionIndex + 1)
					} else if (!preferredPlayers.length && (visualSelectionIndex === 0 || visualSelectionIndex < backupPlayers.length - 1)){
						setVisualSelectionIndex(visualSelectionIndex + 1)
					}
					break
				case 'ArrowUp':
					if (visualSelectionIndex === null) {
						setVisualSelectionIndex(0)
					}
					else if (visualSelectionIndex > 0) {
						setVisualSelectionIndex(visualSelectionIndex - 1);
					}
					break
				case 'Home':
				case 'PageUp':
					setVisualSelectionIndex(0);
					break
				case 'End':
				case 'PageDown':
					if (preferredPlayers.length) {
						setVisualSelectionIndex(preferredPlayers.length - 1);
					}
					else {
						setVisualSelectionIndex(backupPlayers.length - 1);
					}
					break
				case 'Tab':
					if (visualSelectionIndex === null) {
						return
					}
					else if (preferredPlayers.length) {
						handleSelection(preferredPlayers[visualSelectionIndex].name)
					}
					else {
						handleSelection(backupPlayers[visualSelectionIndex].name)
					}
					break
				case 'Enter':
				case ' ':
					e.preventDefault();
					if (visualSelectionIndex === null) {
						setOpen(false);
					}
					else if (preferredPlayers.length) {
						handleSelection(preferredPlayers[visualSelectionIndex].name)
					}
					else {
						handleSelection(backupPlayers[visualSelectionIndex].name)
					}
					break
				default: 
					break;
			}
		}
	}

	const handleOnClick = (e) => {
		setOpen(!open);
	}

	const handleBlur=(e) => {
		if (!dropdownRef.current.contains(e.relatedTarget)) {
			setOpen(false)
		}
	}

	const handleFocus= () => {
		buttonRef.current.focus();
	}

	const handleClear = () => {
		console.log(selectedPlayer);
		setSelectedPlayer('select player');
		updateAvailablePlayers(undefined, { action: 'add', player: selectedPlayer })
	}

	return (
		<>
		<div className="field-position-dropdown" ref={dropdownRef} onBlur={handleBlur}>
			<p className= "field-position" id={labelId}>{position}</p>
			<div className="field-position-dropdown-container">
			<button id={dropdownId}
					 ref={buttonRef}
					 className="field-position-dropdown-button"
					 role="combobox"
					 aria-controls={menuId}
					 aria-expanded={open}
					 aria-haspopup="listbox"
					 aria-activedescendant={activeDescendent}
					 aria-labelledby={labelId}
					 onClick={handleOnClick}
					 onKeyDown={handleOnKeyDown}
					 onFocus={handleFocus}>
				{selectedPlayer}
			</button>
				{
					renderClearSelection &&
					<EditButton onClick={handleClear} type= "remove" />
				}
			</div>
			{/* need to have a button that conditionally renders when selection is made, sibling to main button */}
			{
				open &&
				<ul className="field-position-dropdown-menu" role="listbox" id={menuId}>
					{
						preferredPlayers &&
						preferredPlayers.map((player, i) => 
						<li role="option" 
								aria-selected={i === visualSelectionIndex}
								className={i === visualSelectionIndex? "selected" : undefined}
								key={player.name}
								id={`${optionId}${i}`}>
							<button className="player-option" 
											tabIndex={-1} 
											onClick={() => handleSelection(player.name)}>
												{player.name}
							</button>
						</li>				
						)
					}
					{
						renderTertiary &&
						backupPlayers.map((player, i) => 
						<li role="option"
								aria-selected={i === visualSelectionIndex}
								className={i=== visualSelectionIndex ? "selected" : undefined}
								key={player.name}
								id={`${optionId}${i}`}>
							<button className="player-option"
											tabIndex={-1}
											onClick={() => handleSelection(player.name)}>
												{player.name}
							</button>
						</li>				
						)
					}
				</ul>
			}
		</div>
		</>
	);
};

export default PlayerPositions;
