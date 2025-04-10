import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const AddSubForm = ({ onSubmit: onSubmitProp, selectedPosition, formationPositions, setRenderForm }) => {
  const defaultPosition = selectedPosition ? selectedPosition : '';

  const [addSub, setAddSub] = useState({ name:'', position: defaultPosition, sub: null });
  const dialogEl = useRef(null);
  const firstFocusableEl = useRef(null);
  const lastFocusableEl = useRef(null);
  const prevFocusedEl = useRef(null);
  const submitDisabled = Object.values(addSub).some((val) => !val);

  const handleFormChange = (value, key) => setAddSub({ ...addSub, [key]: value, sub: true });

  if (!prevFocusedEl.current) {
    if (document.activeElement.className.includes('no-option-warning__button')) {
      const dropdownBtn = document.activeElement.closest('.dropdown').querySelector('.dropdown__button');
      prevFocusedEl.current = dropdownBtn;
    } else {
      prevFocusedEl.current = document.activeElement;
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitProp({ action: 'add', player: addSub });
    setAddSub({ name:'', position:'', sub: null });
    setRenderForm(false);
    dialogEl.current.close();
    if(!defaultPosition) {
      Promise.resolve().then(() => {
        const recentlyAddedPlayer =
          document.querySelector(`.button--edit.${addSub.name}`);
          recentlyAddedPlayer.focus();
      })
    } else {
      prevFocusedEl.current.focus();
    }
  }

  const onCancel = (e) => {
    e.preventDefault();
    setAddSub({ name:'', position:'', sub: null });
    setRenderForm(false);
    dialogEl.current.close();
    prevFocusedEl.current.focus();
  }

  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.key === 'Tab') {
      if (!e.shiftKey && document.activeElement === lastFocusableEl.current) {
        firstFocusableEl.current.focus();
      } else if (e.shiftKey && document.activeElement === firstFocusableEl.current) {
        lastFocusableEl.current.focus();
      }
    } else if (e.key === 'Escape') {
      dialogEl.current.close();
      setRenderForm(false);
      prevFocusedEl.current.focus();
    }
  }

  const check = () => {
    if (dialogEl.open) {
      console.log('open');
    } else {
      console.log('nope');
    }
  }
  useEffect(() => {
    firstFocusableEl.current.focus();
    dialogEl.current.showModal();
    check();
  }, [])

  return (
    <dialog ref={dialogEl}
            role="dialog"
            aria-modal={true}
            aria-labelledby="modal-title"
            className="modal__container"
            onKeyDown={handleKeyUp}>
      <div className="modal">
        <h2 id="modal__title">Add A Sub</h2>
        <form aria-label="Add a Sub" className="sub-form" onSubmit= {onSubmit}>
          <div className="sub-form__group">
            <label htmlFor="sub-name">Player Name</label>
            <input id="sub-name"
                   ref={firstFocusableEl}
                   type="text"
                   onChange={(e) => handleFormChange(e.target.value, 'name')}
                   value={addSub.name}/>
          </div>
          <div className="sub-form__group">
            <label htmlFor="sub-position">Player Position</label>
            <select id="sub-position"
                    name="sub-position"
                    onChange={(e) => handleFormChange(e.target.value, 'position')}
                    value={addSub.position}>
              <option value="">Choose a Position</option>
              {formationPositions.map((position) => <option key={position}>{position}</option>)}
            </select>
          </div>
          <button className="sub-form__button"
                  aria-disabled={submitDisabled}
                  disabled={submitDisabled}>
            Add Player
          </button>
          <button className="sub-form__button" ref={lastFocusableEl} type="reset" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </dialog>
  )
}

AddSubForm.propTypes = {
  onSubmit: PropTypes.func,
  formationPositions: PropTypes.arrayOf(PropTypes.string),
  selectedPosition: PropTypes.string,
  setRenderForm: PropTypes.func
};

export default AddSubForm;