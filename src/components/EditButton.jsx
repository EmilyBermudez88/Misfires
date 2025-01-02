import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';

export const EditButton = ({ onClick, type }) => {
  const icon = type === 'add' ? faPlus : faX
  const classNames = type === 'add' ? 'add button--edit' : 'button--edit'
  return (
    <button className={classNames} onClick={onClick}>
      <FontAwesomeIcon className="button__icon"icon={icon}/>
    </button>
  )
}