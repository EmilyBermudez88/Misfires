import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const EditButton = ({ type, onClick, className }) => {
  const icon = type === 'add'
    ? faPlus
    : type === 'update'
      ? faPenToSquare
      : faXmark;

  const buttonClassNames = classnames('button--edit', className, {
      add: type === 'add',
      update: type === 'update'
    });

  return (
    <button className={buttonClassNames} onClick={onClick}>
      <FontAwesomeIcon className="button__icon"icon={icon}/>
    </button>
  )
}

EditButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default EditButton;