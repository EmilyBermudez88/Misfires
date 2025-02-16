import React, { useState, useId, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import EditButton from './EditButton';

const Dropdown = ({ updateSelected, options, open, setOpen, labelId, renderSubForm, position, className }) => {

  const [userSelection, setUserSelection] = useState({}),
    [visualSelectionIndex, setVisualSelectionIndex] = useState(null),
    selectionMade = Object.keys(userSelection).length > 0,
    caret = open ? faAngleUp : faAngleDown,
    formation = className === 'formation',
    defaultDropdownVal = formation ? 'select formation' : 'select player',
    userSelectionDropdownVal = formation ? userSelection.layout : userSelection.name;

  const dropdownId = useId();
  const menuId= useId();
  const optionId = useId();
  const buttonRef = useRef(null);
	const activeDescendent = visualSelectionIndex !== null ? `${optionId}${visualSelectionIndex}` : null;

  const handleSelection = (selected) => {
    if (selected.layout) {
      updateSelected(selected);
    } else {
      selectionMade ?
			updateSelected({ action:'remove', player: selected }, { action:'add', player: userSelection })
			: updateSelected({ action:'remove', player: selected });
    }

		setUserSelection(selected);
		setVisualSelectionIndex(null);
		setOpen(false);
		handleFocus();
	}

  const handleFocus= () => {
    console.log('focusing', buttonRef.current)
		buttonRef.current.focus();
	}

	const handleClear = () => {
		setUserSelection({});
    if (userSelection.name) {
      updateSelected({ action: 'add', player: userSelection });
    }
    buttonRef.current.focus();
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
  // setOpen(true);
  return(
    <>
      <div className={`${className} dropdown__container`}>
        <button id={dropdownId}
                ref={buttonRef}
                className={`${className} dropdown__button`}
                role="combobox"
                aria-controls={menuId}
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-activedescendant={activeDescendent}
                aria-labelledby={labelId}
                onClick={() => setOpen(!open)}
                onKeyDown={handleOnKeyDown}
                onFocus={handleFocus}>
          { selectionMade ? userSelectionDropdownVal : defaultDropdownVal }
          { !selectionMade &&
            <FontAwesomeIcon icon={caret} className="dropdown-caret"/>
          }
        </button>
        { selectionMade &&
          <EditButton onClick={handleClear} type= "remove" />
        }
      </div>
      { open &&
        <ul className={`${className} dropdown__menu`} role="listbox" id={menuId}>
          {options.length
            ? options.map((option, i) =>
              <li role="option"
                  aria-selected={i === visualSelectionIndex}
                  className="dropdown__option"
                  key={`${optionId}${i}`}
                  id={`${optionId}${i}`}>
                <button className={`${className} dropdown__option__button`}
                        tabIndex={-1}
                        onClick={() => handleSelection(option)}>
                  <span className={`${className} dropdown__value`}>
                    { option.name ? option.name: option.layout }
                  </span>
                </button>
              </li>
            ) :
            // Only relevant to Player dropdown
            <li className={`${className} no-option-warning`}>
              No Available Players
              <button className="no-option-warning__button"
                      onClick={() => renderSubForm(true, position)}>
                Add a Sub
              </button>
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
  updateSelected: PropTypes.func,
  renderSubForm: PropTypes.func,
  position: PropTypes.string,
  className: PropTypes.string
}

export default Dropdown;