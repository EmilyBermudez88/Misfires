import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { updateAvailablePlayers, calculateButtonClassName } from '../utils/playerUtils';
import { PlayerType, AvailablePositions } from '../types/types';

interface AddSubFormProps {
  setAvailablePlayers: React.Dispatch<React.SetStateAction<PlayerType[]>>;
  selectedPosition?: AvailablePositions | null;
  formationPositions: AvailablePositions[];
  openModal: boolean;
  closeModal: () => void;
}

const AddSubForm =
({ setAvailablePlayers, selectedPosition, formationPositions, openModal, closeModal }: AddSubFormProps) => {
  const defaultPosition = selectedPosition || '';
  const [subName, setSubName] = useState('');
  const [subPosition, setSubPosition] = useState<AvailablePositions | ''>(defaultPosition);
  const [renderValidationError, setRenderValidationError] = useState(false);

  const dialogEl = useRef<HTMLDialogElement>(null);
  const firstFocusableEl = useRef<HTMLInputElement | null>(null);
  const lastFocusableEl = useRef<HTMLButtonElement | null>(null);
  const prevFocusedEl = useRef<HTMLElement | null>(null);

  const isInvalid = !subName || !subPosition;
  const submitDisabled = isInvalid && renderValidationError;
  const inputClassNames = classnames('sub-form__input', {
    'sub-form__input--invalid': !subName && renderValidationError
  });
  const selectClassNames = classnames('sub-form__select', {
    'sub-form__select--invalid': !subPosition && renderValidationError
  });
  const submitBtnClassNames = classnames('sub-form__button sub-form__button--submit', {
    'sub-form__button--disabled': submitDisabled
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isInvalid) {
      setRenderValidationError(true);
      return
    } else {
      setRenderValidationError(false);
    }

    const newPlayer: PlayerType = {
      name: subName,
      position: [subPosition],
      sub: true
    };
    setAvailablePlayers(prev =>
        updateAvailablePlayers(prev, { action: 'add', player: newPlayer })
    )
    handleClose();

    if(!selectedPosition) {
      Promise.resolve().then(() => {
        const recentlyAddedPlayer = document.querySelector(`.${calculateButtonClassName(subName)}`);
        if (recentlyAddedPlayer instanceof HTMLButtonElement) {
          recentlyAddedPlayer.focus();
        }
      })
    } else {
      Promise.resolve().then(() => {
        prevFocusedEl.current?.focus();
      })
    }
  }

  const onCancel = () => {
    handleClose();
    closeModal();
    Promise.resolve().then(() => {
      prevFocusedEl.current?.focus();
    })
  }

  const handleClose = () => {
    setSubName('');
    setSubPosition('');
    setRenderValidationError(false);
    closeModal();
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (!e.shiftKey && document.activeElement === lastFocusableEl.current) {
        e.preventDefault();
        firstFocusableEl.current?.focus();
      } else if (e.shiftKey && document.activeElement === firstFocusableEl.current) {
        e.preventDefault();
        lastFocusableEl.current?.focus();
      }
    } else if (e.key === 'Escape') {
      closeModal();
      Promise.resolve().then(() => {
        prevFocusedEl.current?.focus();
      })
    }
  }

  useEffect(() => {
    if (openModal && !prevFocusedEl.current) {
      if (document.activeElement?.className.includes('dropdown__button--warning')) {
        const dropdownContainer = document.activeElement.closest('.dropdown__container') as HTMLUListElement;
        const dropdownBtn = dropdownContainer?.querySelector('.dropdown__button--main');
        if (dropdownBtn instanceof HTMLButtonElement) {
          prevFocusedEl.current = dropdownBtn;
        }
      } else {
        prevFocusedEl.current = document.activeElement as HTMLElement;
      }
    }
}, [openModal]);

  useEffect(() => {
    if (openModal) {
      dialogEl.current?.showModal();
      firstFocusableEl.current?.focus();
    } else {
      dialogEl.current?.close();
    }
  }, [openModal])

  useEffect(() => {
    if(!isInvalid && renderValidationError) {
      setRenderValidationError(false);
    }
  }, [renderValidationError, submitDisabled]);

  return (
    <dialog ref={dialogEl}
            role="dialog"
            aria-modal={true}
            aria-labelledby="modal-title"
            className="modal__container"
            onKeyDown={handleKeyDown}>
      <div className="modal">
        <header className="modal__header">
          <h2 className="modal__title">Add A Sub</h2>
        </header>
        <form aria-label="Add a Sub" className="sub-form" onSubmit={onSubmit}>
          <div className="sub-form__group">
            <label htmlFor="sub-name">
              Player Name
              <span className="asterisk">*</span>
            </label>
            <input id="sub-name"
                   className={inputClassNames}
                   ref={firstFocusableEl}
                   type="text"
                   onChange={(e) => setSubName(e.target.value)}
                   value={subName}/>
          </div>
          <div className="sub-form__group">
            <label htmlFor="sub-position">
              Player Position
              <span className="asterisk">*</span>
            </label>
            <select id="sub-position"
                    className={selectClassNames}
                    name="sub-position"
                    onChange={(e) => setSubPosition(e.target.value as AvailablePositions)}
                    value={subPosition}>
              <option value="">Choose a Position</option>
              {formationPositions.map((position) => <option key={position}>{position}</option>)}
            </select>
          </div>
          <div className="sub-form__button-bar">
            {renderValidationError &&
              <p className="validation-message">
                <span className="asterisk">*</span>
                Fill all fields
              </p>
            }
            <button className={submitBtnClassNames} disabled={submitDisabled}>
              Add Player
            </button>
            <button className="sub-form__button" ref={lastFocusableEl} type="reset" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default AddSubForm;