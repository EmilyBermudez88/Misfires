import React, { useState, useId, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';

import { FormationContext } from '../contexts/FormationContext';
import { PlayersContext } from '../contexts/PlayersContext';
import { updateAvailablePlayers } from '../util/playerUtils';

const Dropdown = ({ updateSelected, options, labelId, renderSubForm, position, selectionType }) => {
  const [userSelection, setUserSelection] = useState({});
  const [visualSelectionIndex, setVisualSelectionIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const { formation } = useContext(FormationContext)
  const { setAvailablePlayers } = useContext(PlayersContext);

  const dropdownId = useId();
  const menuId= useId();
  const optionId = useId();
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const ref = useRef(null);

  const selectionMade = Object.keys(userSelection).length > 0;
  const defaultDropdownVal = selectionType === 'formation'
      ? 'select formation'
      : selectionType === 'position'
        ? 'select player'
        : 'home';
  const activeDescendent = visualSelectionIndex !== null ? `${optionId}${visualSelectionIndex}` : null;
  const openKeys = [' ', 'ArrowDown', 'ArrowUp', 'Enter', 'Home', 'End'];
  // We don't want to ever 'clear' the Jersey colour, so never render a closeBtn
  const showCaret = selectionType !== 'position' || !selectionMade;
  const showCancelButton = selectionType === 'position' && selectionMade;

  const buttonClassNames = classNames('dropdown__button--main', {
    'unselected': selectionType === 'position' && !selectionMade
  });

  const handleBlur=(e) => {
    if (!ref.current.contains(e.relatedTarget)) {
      setOpen(false)
    }
  }

  const handleSelection = (selected) => {
    if (!selected) {
      return;
    }
    if (selectionType !== 'position') {
      updateSelected(selected);
    } else {
      if (selectionMade) {
        setAvailablePlayers((prev) =>
          updateAvailablePlayers(prev, { action: 'remove', player: selected }, { action: 'add', player: userSelection })
        )
      } else {
        setAvailablePlayers((prev) =>
          updateAvailablePlayers(prev, { action: 'remove', player: selected })
        );
      }
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
    if (selectionType === 'position') {
      setAvailablePlayers((prev) =>
        updateAvailablePlayers(prev, { action: 'add', player: userSelection })
      );
    }
  }

  const handleClear = () => {
    reset();
    handleFocus();
  }

  const openDropdown = (key) => {
    setOpen(true);
    if (key === 'ArrowUp' || key === 'Home') {
      setVisualSelectionIndex(0);
    } else if (key === 'End') {
      setVisualSelectionIndex(options.length - 1);
    }
    else {
      setVisualSelectionIndex(null);
    }
  }

  const moveToStart = () => setVisualSelectionIndex(0);
  const moveToEnd = () => setVisualSelectionIndex(options.length - 1);
  const moveToNext = () => setVisualSelectionIndex(visualSelectionIndex + 1);
  const moveToPrev = () => setVisualSelectionIndex(visualSelectionIndex - 1);

  const handleOnKeyDown = (e) => {
    if (e.key !== 'Tab') {
      e.preventDefault();
    }
    if (!open && openKeys.includes(e.key)) {
      openDropdown(e.key);
    }
    else if (open) {
      switch (e.key) {
        case 'Tab':
          if (visualSelectionIndex !== null) {
            handleSelection(options[visualSelectionIndex])
          }
          break
        case 'Enter':
        case ' ':
          setOpen(false);
          if (visualSelectionIndex !== null) {
            handleSelection(options[visualSelectionIndex])
          }
          break
        case'ArrowDown':
          if (visualSelectionIndex === null) {
            moveToStart();
          }
          else if (options.length &&
            (visualSelectionIndex === 0 || visualSelectionIndex < options.length - 1)) {
            moveToNext();
          }
          break
        case 'ArrowUp':
          if (visualSelectionIndex === null) {
            moveToStart();
          }
          else if (visualSelectionIndex > 0) {
            moveToPrev();
          }
          break
        case 'Home':
        case 'PageUp':
          moveToStart();
          break
        case 'End':
        case 'PageDown':
          moveToEnd();
          break

        case 'Escape':
          setOpen(false)
          break
        default:
          break;
      }
    }
  }

  useEffect(() => {
    if (selectionType === 'formation') {
      buttonRef.current.focus();
    }
    setUserSelection({});
  }, [])

  useEffect(() => {
    if (dropdownRef && visualSelectionIndex !== null) {
      const focusedVal= dropdownRef.current?.children[visualSelectionIndex];
      focusedVal?.scrollIntoView({ block: 'nearest' });
    }
  }, [visualSelectionIndex])

  useEffect(() => {
    setUserSelection({});
  }, [formation])

  return(
    <div className="dropdown__container" ref={ref} onBlur={handleBlur}>
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
                onFocus={handleFocus}
              >
          {selectionMade ? (
            <span>{userSelection.dropdownValue}</span>
          ) : (
            <span>{defaultDropdownVal}</span>
          )}
          {showCaret && <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} className="dropdown-caret" />}
        </button>
        {showCancelButton && <IconButton onClick={handleClear} type="clear selected"/>}
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
                <button className="dropdown__button--option"
                        tabIndex={-1}
                        onClick={() => handleSelection(option)}>
                  <span className="dropdown__value">
                    { option.dropdownValue }
                  </span>
                </button>
              </li>
            ) :
            // Only relevant to Player dropdown
            <li role="option" className="dropdown__option--warning">
              <span className="dropdown__value">NO ONE AVAILABLE</span>
              <button className="dropdown__button--warning sub-form__button"
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