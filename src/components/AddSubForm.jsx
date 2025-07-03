import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const AddSubForm =
({ onSubmit: onSubmitProp, selectedPosition, formationPositions, openModal, closeModal }) => {
  const defaultPosition = selectedPosition ? selectedPosition : '';

  const [addSub, setAddSub] = useState({ name:'', position: defaultPosition, sub: null });
  const [renderValidationError, setRenderValidationError] = useState(false);

  const dialogEl = useRef(null);
  const firstFocusableEl = useRef(null);
  const lastFocusableEl = useRef(null);
  const prevFocusedEl = useRef(null);
  const submitDisabled = Object.values(addSub).some((val) => !val);
  const inputClassNames = classnames('sub-form__input', {
    invalid: !addSub.name && renderValidationError
  });
  const selectClassNames = classnames('sub-form__select', {
    invalid: !addSub.position && renderValidationError
  });
  const submitBtnClassNames = classnames('sub-form__button sub-form__button--submit', {
    disabled: renderValidationError && submitDisabled
  });

  const handleFormChange = (value, key) => setAddSub({ ...addSub, [key]: [value], sub: true });

  if (!prevFocusedEl.current) {
    if (document.activeElement.className.includes('no-option-warning__button')) {
      const dropdownBtn =
        document.activeElement.closest('.dropdown__container').querySelector('.dropdown__button');
      prevFocusedEl.current = dropdownBtn;
    } else {
      prevFocusedEl.current = document.activeElement;
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (submitDisabled) {
      setRenderValidationError(true);
      return
    } else {
      setRenderValidationError(false);
    }
    onSubmitProp({ action: 'add', player: { ...addSub, position: [addSub.position]}});
    setAddSub({ name:'', position:'', sub: null });
    closeModal();
    if(!defaultPosition) {
      Promise.resolve().then(() => {
        const recentlyAddedPlayer =
          document.querySelector(`.button--edit.${addSub.name}`);
          recentlyAddedPlayer.focus();
      })
    } else {
      Promise.resolve().then(() => {
        prevFocusedEl.current.focus();
      })
    }
  }

  const onCancel = (e) => {
    e.preventDefault();
    setAddSub({ name:'', position:'', sub: null });
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
    if (openModal) {
      dialogEl.current.showModal();
      firstFocusableEl.current.focus();
    } else {
      dialogEl.current.close();
    }
  }, [openModal])

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
            <button className={submitBtnClassNames}>
              Add Player
            </button>
            <button className="sub-form__button" ref={lastFocusableEl} type="reset" onClick={onCancel}>Cancel</button>
            {renderValidationError &&
              <p className="validation-message">
                <span className="asterisk">*</span>
                Fill all fields
              </p>
            }
          </div>
        </form>
      </div>
    </dialog>
  )
}

AddSubForm.propTypes = {
  onSubmit: PropTypes.func,
  formationPositions: PropTypes.arrayOf(PropTypes.string),
  selectedPosition: PropTypes.string,
  openModal: PropTypes.bool,
  closeModal: PropTypes.func
};

export default AddSubForm;