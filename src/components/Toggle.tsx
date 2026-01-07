import React from 'react';

interface ToggleProps {
  showValue: boolean;
  setShowValue: (value: boolean) => void;
}

const Toggle = ({ showValue, setShowValue }: ToggleProps) => {
  const toggleText = showValue ? 'Hide Positions' : 'Show Positions';
  return (
    <div className="toggle-label-container">
      <label className="toggle">
        <span id="toggle-text" className="toggle__text">{toggleText}</span>
        <input className="toggle__input"
               type="checkbox"
               role="switch"
               checked={showValue}
               onChange={() => setShowValue(!showValue)}
               aria-labelledby="toggle-text"/>
        <span className="toggle__container">
          <span className="toggle__slider"/>
        </span>
      </label>
    </div>
  )
};

export default Toggle;