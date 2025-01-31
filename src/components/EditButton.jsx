import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';

const EditButton = ({ type }) => {
  const icon = type === 'add' ? faPlus : faX
  const classNames = type === 'add' ? 'add button--edit' : 'button--edit'

  return (
    <button className={classNames}>
      <FontAwesomeIcon className="button__icon"icon={icon}/>
    </button>
  )
}

EditButton.propTypes = {
  type: PropTypes.string
};

export default EditButton;