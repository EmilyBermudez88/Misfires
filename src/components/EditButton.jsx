import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';

export const EditButton = ({ onClick, type }) => {
  const icon = type === 'add' ? faPlus : faX
  const classNames = type === 'add' ? 'add edit-button' : 'edit-button'
  return (
    <button className={classNames} onClick={onClick}>
      <FontAwesomeIcon className="button-icon"icon={icon}/>
    </button>
  )
}