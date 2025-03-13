import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';

const EditButton = ({ type, onClick }) => {
  const icon = type === 'add' ? faPlus : faX,
    buttonClassNames = classnames('button--edit', {
      add: type === 'add'
    });

  return (
    <button className={buttonClassNames} onClick={onClick}>
      <FontAwesomeIcon className="button__icon"icon={icon}/>
    </button>
  )
}

EditButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default EditButton;