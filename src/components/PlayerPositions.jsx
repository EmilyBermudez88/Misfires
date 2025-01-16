import React, { useEffect, useState, useId, useRef } from "react";
import { EditButton } from "./EditButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Jersey from '../assets/Jersey.png';

const PlayerPositions = ({ position, updateAvailablePlayers, availablePlayers, renderSubForm}) => {
	// We still want to parse the availablePlayers array into preferred positions to
	// make the choice easier of which player should go where
	const [preferredPlayers, setPreferredPlayers] = useState([]),
		[backupPlayers, setBackupPlayers] = useState([]),
		[selectedPlayer, setSelectedPlayer] = useState({}),
		[open, setOpen] = useState(false),
		[visualSelectionIndex, setVisualSelectionIndex] = useState(null),
    selectionMade = Object.keys(selectedPlayer).length > 0,
		renderTertiary = !preferredPlayers.length,
		renderWarning = !preferredPlayers.length && !backupPlayers.length,
    caret = open ? faAngleUp : faAngleDown;

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
		selectionMade ? 
			updateAvailablePlayers({action:'remove', player: selected}, {action:'add', player: selectedPlayer})
			: updateAvailablePlayers({action:'remove', player: selected});
		setSelectedPlayer(selected);
		setVisualSelectionIndex(null);
		setOpen(false);
		handleFocus();
	}

	const handleOnKeyDown = (e) => {
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

	const handleBlur=(e) => {
		if (!dropdownRef.current.contains(e.relatedTarget)) {
			setOpen(false)
		}
	}

	const handleFocus= () => {
		buttonRef.current.focus();
	}

	const handleClear = () => {
		setSelectedPlayer({});
		updateAvailablePlayers({ action: 'add', player: selectedPlayer })
	}

	return (
		<div className="field-position">
      <div className="field-position__icon-container">
        <img src={Jersey} alt="" className="field-position__icon"/>
        <p className= "field-position__title" id={labelId}>{position}</p>
      
			<div className="field-position-dropdown" ref={dropdownRef} onBlur={handleBlur}>
				<div className="field-position-dropdown__container">
          <button id={dropdownId}
              ref={buttonRef}
              className="field-position-dropdown__button"
              role="combobox"
              aria-controls={menuId}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-activedescendant={activeDescendent}
              aria-labelledby={labelId}
              onClick={() => setOpen(!open)}
              onKeyDown={handleOnKeyDown}
              onFocus={handleFocus}>
            {selectionMade ? selectedPlayer.name : 'select player'}
            {
              !selectionMade &&
              <FontAwesomeIcon icon={caret} className="dropdown-caret"/>
            }
          </button> 
					{
						selectionMade &&
						<EditButton onClick={handleClear} type= "remove" />
					}
				</div>
				{
					open &&
					<ul className="field-position-dropdown__menu" role="listbox" id={menuId}>
						{
							preferredPlayers &&
							preferredPlayers.map((player, i) => 
							<li role="option" 
									aria-selected={i === visualSelectionIndex}
									className={i === visualSelectionIndex? "selected" : undefined}
									key={player.name}
									id={`${optionId}${i}`}>
								<button className="field-position-dropdown__player-option" 
												tabIndex={-1} 
												onClick={() => handleSelection(player)}>
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
								<button className="field-position-dropdown__player-option"
												tabIndex={-1}
												onClick={() => handleSelection(player)}>
													{player.name}
								</button>
							</li>				
							)
						}
						{
							renderWarning &&
							<li className="field-position-dropdown__no-option-warning">
                No Available Players
                <button onClick={() => renderSubForm(true, position)}>Add a Sub</button>
              </li>
						}
					</ul>
				}
        </div>
			</div>
		</div>
	);
};

export default PlayerPositions;
