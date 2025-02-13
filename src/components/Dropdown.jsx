import React, { useState, useId, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import EditButton from './EditButton';

const Dropdown = ({ updateAvailablePlayers, options, open, setOpen, labelId, renderSubForm, position }) => {

  const [selectedPlayer, setSelectedPlayer] = useState({}),
    [visualSelectionIndex, setVisualSelectionIndex] = useState(null),
    selectionMade = Object.keys(selectedPlayer).length > 0,
    caret = open ? faAngleUp : faAngleDown;

  const dropdownId = useId();
  const menuId= useId();
  const optionId = useId();
  const buttonRef = useRef(null);
	const activeDescendent = visualSelectionIndex !== null ? `${optionId}${visualSelectionIndex}` : null;

  const handleSelection = (selected) => {
		selectionMade ?
			updateAvailablePlayers({ action:'remove', player: selected }, { action:'add', player: selectedPlayer })
			: updateAvailablePlayers({ action:'remove', player: selected });
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
				setVisualSelectionIndex(options.length - 1)
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
					else if (options.length &&
            (visualSelectionIndex === 0 || visualSelectionIndex < options.length - 1)) {
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
          setVisualSelectionIndex(options.length - 1);
					break
				case 'Tab':
					if (visualSelectionIndex === null) {
						return
					}
					else {
						handleSelection(options[visualSelectionIndex])
					}
					break
				case 'Enter':
				case ' ':
					e.preventDefault();
					if (visualSelectionIndex === null) {
						setOpen(false);
					}
					else {
						handleSelection(options[visualSelectionIndex])
					}
					break
				default:
					break;
			}
		}
	}

  const handleFocus= () => {
    console.log('focusing?', buttonRef.current);
		buttonRef.current.focus();
	}

	const handleClear = () => {
		setSelectedPlayer({});
		updateAvailablePlayers({ action: 'add', player: selectedPlayer });
    buttonRef.current.focus();
	}
  return(
    <>
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
          { !selectionMade &&
            <FontAwesomeIcon icon={caret} className="dropdown-caret"/>
          }
        </button>
        { selectionMade &&
          <EditButton onClick={handleClear} type= "remove" />
        }
      </div>
      { open &&
        <ul className="field-position-dropdown__menu" role="listbox" id={menuId}>
          {options.length
            ? options.map((player, i) =>
              <li role="option"
                  aria-selected={i === visualSelectionIndex}
                  className={i === visualSelectionIndex? 'selected' : undefined}
                  key={player.name}
                  id={`${optionId}${i}`}>
                <button className="field-position-dropdown__player-option"
                        tabIndex={-1}
                        onClick={() => handleSelection(player)}>
                  {player.name}
                </button>
              </li>
            ) :
            <li className="field-position-dropdown__no-option-warning">
              No Available Players
              <button onClick={() => renderSubForm(true, position)}>Add a Sub</button>
            </li>
          }
        </ul>
      }
    </>
  )
}

Dropdown.propTypes = {
  options: PropTypes.array,
  labelId: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  updateAvailablePlayers: PropTypes.func,
  renderSubForm: PropTypes.func,
  position: PropTypes.string
}

export default Dropdown;