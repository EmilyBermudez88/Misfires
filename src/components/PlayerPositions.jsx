import React, { useEffect, useState, useId, useRef } from "react";

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
		renderTertiary = !preferredPlayers.length;

	const dropdownId = useId();
	const menuId= useId();
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);

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

	// NEXT STEPS!!!! - TAB needs to move to next element --> this may have to be done in field lineup
	const handleOnKeyDown = (e) => {
		console.log(e.key)
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
					else if (visualSelectionIndex === 0 || visualSelectionIndex < preferredPlayers.length - 1) {
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
					setVisualSelectionIndex(preferredPlayers.length - 1);
					break
				case 'Tab':
					handleSelection(preferredPlayers[visualSelectionIndex].name)
				case 'Enter':
				case ' ':
					if (visualSelectionIndex === null) {
						setOpen(false);
					}
					else {
						handleSelection(preferredPlayers[visualSelectionIndex].name)
					}
					e.preventDefault();
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

	return (
		<>
		<div className="field-position-dropdown" ref={dropdownRef} onBlur={handleBlur}>
			<p className= "field-position">{position}</p>
			<button id={dropdownId}
					 ref={buttonRef}
					 className="field-position-dropdown-button"
					 role="combobox"
					 aria-controls={menuId}
					 aria-expanded={open}
					 aria-haspopup="listbox"
					 onClick={handleOnClick}
					 onKeyDown={handleOnKeyDown}
					 onFocus={handleFocus}>
				{selectedPlayer}
			</button>
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
								key={player.name}>
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
						backupPlayers.map((player) => 
						<li role="option" aria-selected="false" className="player-option" key={player.name}>
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
			{/* <label htmlFor="field-position-dropdown">{position}</label>
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
						renderTertiary &&
							<optgroup label="Third Choices">
								{ 
									tertiaryPlayers.map((player) => 
									<option className="player-option" key={player.name}>{player.name}</option>)
								}
							</optgroup>
					}
			</select> */}
		</div>
		</>
	);
};

export default PlayerPositions;

// main component will be a button
	// have aria-haspopup="true"
	// have aria-expanded --> state to set open / closed
	// onClick --> set state to open / closed (also tabbed into)
	// should have role of "button" 
	// will likely need an 'aria-labelled-by' with a label above
//dropdown will be a div container --> holding the ul & lis => or <menu> and lis? 
	// property of menu
	// needs to be focusable - so each item needs to be a button perhaps?
	// need to think of what an empty value/string is --> is this 'select player?'
	// managing focus - when clicked out and refocused, needs to keep its selection
	// when one is selected, it closes the dropdown