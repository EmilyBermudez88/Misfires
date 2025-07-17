import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { updateAvailablePlayers, calculateButtonClassName } from '../util/playerUtils';

const AddSubForm =
({ setAvailablePlayers, selectedPosition, formationPositions, openModal, closeModal }) => {
  const defaultPosition = selectedPosition ? selectedPosition : '';
  const [addSub, setAddSub] = useState({ name:'', position: defaultPosition, sub: null });
  const [renderValidationError, setRenderValidationError] = useState(false);

  const dialogEl = useRef(null);
  const firstFocusableEl = useRef(null);
  const lastFocusableEl = useRef(null);
  const prevFocusedEl = useRef(null);
  const missingFormValues = !addSub.name || !addSub.position;
  const submitDisabled = missingFormValues && renderValidationError;
  const inputClassNames = classnames('sub-form__input', {
    'sub-form__input--invalid': !addSub.name && renderValidationError
  });
  const selectClassNames = classnames('sub-form__select', {
    'sub-form__select--invalid': !addSub.position && renderValidationError
  });
  const submitBtnClassNames = classnames('sub-form__button sub-form__button--submit', {
    'sub-form__button--disabled': submitDisabled
  });

  const handleFormChange = (value, key) => setAddSub({ ...addSub, [key]: value, sub: true });

  const onSubmit = (e) => {
    e.preventDefault();
    if (missingFormValues) {
      setRenderValidationError(true);
      return
    } else {
      setRenderValidationError(false);
    }

    setAvailablePlayers(prev =>
        updateAvailablePlayers(prev, { action: 'add', player: { ...addSub, position: [addSub.position]}})
    )
    setAddSub({ name:'', position: defaultPosition, sub: null });
    closeModal();

    if(!defaultPosition) {
      Promise.resolve().then(() => {
        const recentlyAddedPlayer =
          document.querySelector(`.${calculateButtonClassName(addSub.name, 'remove')}`);
          if (recentlyAddedPlayer) {
            recentlyAddedPlayer.focus();
          }
      })
    } else {
      Promise.resolve().then(() => {
        prevFocusedEl.current.focus();
      })
    }
  }

  const onCancel = (e) => {
    e.preventDefault();
    setAddSub({ name:'', position: defaultPosition, sub: null });
    closeModal();
    Promise.resolve().then(() => {
      prevFocusedEl.current.focus();
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (!e.shiftKey && document.activeElement === lastFocusableEl.current) {
        e.preventDefault();
        firstFocusableEl.current.focus();
      } else if (e.shiftKey && document.activeElement === firstFocusableEl.current) {
        e.preventDefault();
        lastFocusableEl.current.focus();
      }
    } else if (e.key === 'Escape') {
      closeModal();
      Promise.resolve().then(() => {
        prevFocusedEl.current.focus();
      })
    }
  }

  useEffect(() => {
    if (openModal && !prevFocusedEl.current) {
      if (document.activeElement && document.activeElement.className.includes('dropdown__button--warning')) {
          const dropdownBtn = document.activeElement
            .closest('.dropdown__container')
            .querySelector('.dropdown__button--main');
          prevFocusedEl.current = dropdownBtn;
      } else {
          prevFocusedEl.current = document.activeElement;
      }
    }
}, [openModal]);

  useEffect(() => {
    if (openModal) {
      dialogEl.current.showModal();
      firstFocusableEl.current.focus();
    } else {
      dialogEl.current.close();
    }
  }, [openModal])

  useEffect(() => {
    if(!missingFormValues && renderValidationError) {
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
                   onChange={(e) => handleFormChange(e.target.value, 'name')}
                   value={addSub.name}/>
          </div>
          <div className="sub-form__group">
            <label htmlFor="sub-position">
              Player Position
              <span className="asterisk">*</span>
            </label>
            <select id="sub-position"
                    className={selectClassNames}
                    name="sub-position"
                    onChange={(e) => handleFormChange(e.target.value, 'position')}
                    value={addSub.position}>
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

AddSubForm.propTypes = {
  setAvailablePlayers: PropTypes.func.isRequired,
  formationPositions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedPosition: PropTypes.string,
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default AddSubForm;