import React, { useState, useId, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';
import { JerseyColourType } from '../App';

export type DropdownOption = JerseyColourType | string;

interface DropdownProps {
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  selectedValue?: string;
  placeholder: string;
  labelId: string;
  className?: string;
  showCaret?: boolean;
  emptyState?: React.ReactNode; // Custom UI when options are empty (e.g., "Add Sub")
  autoFocus?: boolean;
}

const Dropdown = ({ options,
    onSelect,
    selectedValue,
    placeholder,
    labelId,
    className,
    showCaret = true,
    emptyState,
    autoFocus
  }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [visualSelectionIndex, setVisualSelectionIndex] = useState<number | null>(null);

  const dropdownId = useId();
  const menuId= useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // const selectionMade = Object.keys(userSelection).length > 0;
  // const defaultDropdownVal = selectionType === 'formation'
  //     ? 'select formation'
  //     : selectionType === 'position'
  //       ? 'select player'
  //       : 'home';
  const activeDescendent = visualSelectionIndex?.toString() || undefined;
  const openKeys = [' ', 'ArrowDown', 'ArrowUp', 'Enter', 'Home', 'End'];
  // We don't want to ever 'clear' the Jersey colour, so never render a closeBtn
  // const showCancelButton = selectionType === 'position' && selectionMade;

  // const buttonClassNames = classNames('dropdown__button--main', {
  //   'unselected': selectionType === 'position' && !selectionMade
  // });

  const handleBlur=(e: React.FocusEvent<HTMLDivElement>) => {
    if (!ref.current?.contains(e.relatedTarget as Node)) {
      setOpen(false)
    }
  }

  const handleSelection = (option: DropdownOption) => {
    console.log(option);
    onSelect(option);
    setVisualSelectionIndex(null);
    setOpen(false);
    handleFocus();
  }

  const handleFocus= () => {
    buttonRef.current?.focus();
  }

  const openDropdown = (key: string) => {
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
  const moveToNext = (currendIndex: number) => setVisualSelectionIndex(currendIndex + 1);
  const moveToPrev = (currendIndex: number) => setVisualSelectionIndex(currendIndex - 1);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
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
            moveToNext(visualSelectionIndex);
          }
          break
        case 'ArrowUp':
          if (visualSelectionIndex === null) {
            moveToStart();
          }
          else if (visualSelectionIndex > 0) {
            moveToPrev(visualSelectionIndex);
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
    if (autoFocus) {
      buttonRef.current?.focus();
    }
  }, [autoFocus])

  useEffect(() => {
    if (menuRef && open && visualSelectionIndex !== null) {
      const focusedEl= menuRef.current?.children[visualSelectionIndex] as HTMLElement;
      focusedEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [visualSelectionIndex, open])

  return(
    <div ref={ref} className="dropdown__container" onBlur={handleBlur}>
      <div className="dropdown">
        <button id={dropdownId}
                ref={buttonRef}
                className={classNames('dropdown__button--main', className)}
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
          <span>{selectedValue || placeholder}</span>
          {showCaret && <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} className="dropdown-caret" />}
        </button>
        {/* {showCancelButton && <IconButton onClick={handleClear} type="clear"/>} */}
      </div>
      { open &&
        <ul ref={menuRef} className="dropdown__menu" role="listbox" id={menuId}>
          {options.length
            ? options.map((option, i) =>
              <li role="option"
                  aria-selected={i === visualSelectionIndex}
                  className="dropdown__option"
                  key={i}>
                <button className="dropdown__button--option"
                        tabIndex={-1}
                        onClick={() => handleSelection(option)}>
                  <span className="dropdown__value">{option}</span>
                </button>
              </li>
            ) : (
              emptyState
            )
            // // Only relevant to Player dropdown
            // <li role="option" className="dropdown__option--warning">
            //   <span className="dropdown__value">NO ONE AVAILABLE</span>
            //   <button className="dropdown__button--warning sub-form__button"
            //           onClick={() => renderSubForm(true, position)}>
            //     Add Sub
            //   </button>
            // </li>
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