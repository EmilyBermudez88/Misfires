import React, { useState, useId, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import EditButton from './EditButton';
import { FormationContext } from '../App';
import classNames from 'classnames';

const Dropdown = ({ updateSelected, options, labelId, renderSubForm, position, selectionType }) => {

  const [userSelection, setUserSelection] = useState({}),
    [visualSelectionIndex, setVisualSelectionIndex] = useState(null),
    [open, setOpen] = useState(false),
    selectionMade = Object.keys(userSelection).length > 0,
    caret = open ? faAngleUp : faAngleDown,
    defaultDropdownVal = selectionType === 'formation'
      ? 'select formation'
      : selectionType === 'position'
        ? 'select player'
        : 'home',
    userSelectionDropdownVal = selectionType ===
    'position' ? userSelection.name : userSelection.dropdownValue;

  const dropdownId = useId();
  const menuId= useId();
  const optionId = useId();
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const ref = useRef(null);
	const activeDescendent = visualSelectionIndex !== null ? `${optionId}${visualSelectionIndex}` : null;
  const openKeys = [' ', 'ArrowDown', 'ArrowUp', 'Enter', 'Home', 'End'];

  const buttonClassNames = classNames('dropdown__button', {
    'unselected' : selectionType === 'position' && !selectionMade
  });

  const handleBlur=(e) => {
		if (!ref.current.contains(e.relatedTarget)) {
			setOpen(false)
		}
	}

  const handleSelection = (selected) => {
    if (selected.dropdownValue) {
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
		buttonRef.current.focus();
	}

  const reset = () => {
    setUserSelection({});
    if (userSelection.name) {
      updateSelected({ action: 'add', player: userSelection });
    }
  }

	const handleClear = () => {
    reset();
    handleFocus();
	}

  const handleOnKeyDown = (e) => {
    if (e.key !== 'Tab') {
      e.preventDefault();
    }
		if (!open && openKeys.includes(e.key)) {
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
  // const open2 = true;
  useEffect(() => {
    if (dropdownRef && visualSelectionIndex !== null) {
      const focusedVal= dropdownRef.current?.children[visualSelectionIndex];
      focusedVal.scrollIntoView({ block: 'nearest' });
    }
  }, [visualSelectionIndex])

  useEffect(() => {
    if (selectionType === 'formation') {
      buttonRef.current.focus();
    }
  }, [])

  const { formation } = useContext(FormationContext)
  useEffect(() => {
    setUserSelection({});
  }, [formation])
  // const open2 = true;
  return(
    <div className="dropdown__container"ref={ref} onBlur={handleBlur}>
      <div className="dropdown">
        <button id={dropdownId}
                ref={buttonRef}
                className={buttonClassNames}
                role="combobox"
                aria-controls={menuId}
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-activedescendant={activeDescendent}
                aria-labelledby={labelId}
                onClick={() => setOpen(!open)}
                onKeyDown={handleOnKeyDown}
                onFocus={handleFocus}>
          { selectionMade
            ? userSelectionDropdownVal
            :
            <>
              <span>{defaultDropdownVal}</span>
              <FontAwesomeIcon icon={caret} className="dropdown-caret"/>
            </>}
        </button>
        { selectionMade && <EditButton onClick={handleClear}/>}
      </div>
      { open &&
        <ul ref={dropdownRef} className="dropdown__menu" role="listbox" id={menuId}>
          {options.length
            ? options.map((option, i) =>
              <li role="option"
                  aria-selected={i === visualSelectionIndex}
                  className="dropdown__option"
                  key={`${optionId}${i}`}
                  id={`${optionId}${i}`}>
                <button className="dropdown__option__button"
                        tabIndex={-1}
                        onClick={() => handleSelection(option)}>
                  <span className="dropdown__value">
                    { option.name ? option.name: option.dropdownValue }
                  </span>
                </button>
              </li>
            ) :
            // Only relevant to Player dropdown
            <li className="dropdown--position no-option-warning">
              <span>NO ONE AVAILABLE</span>
              <button className="no-option-warning__button sub-form__button"
                      onClick={() => renderSubForm(true, position)}>
                Add Sub
              </button>
            </li>
          }
        </ul>
       }
    </div>
  )
}

Dropdown.propTypes = {
  options: PropTypes.array,
  labelId: PropTypes.string,
  updateSelected: PropTypes.func,
  renderSubForm: PropTypes.func,
  position: PropTypes.string,
  selectionType: PropTypes.string
}

export default Dropdown;