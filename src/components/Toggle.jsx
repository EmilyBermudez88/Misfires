import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ showValue, setShowValue }) => {
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

Toggle.propTypes = {
  setShowValue: PropTypes.func.isRequired,
  showValue: PropTypes.bool.isRequired
};

export default Toggle;