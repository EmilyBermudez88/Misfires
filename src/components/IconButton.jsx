import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const IconButton = ({ type, onClick, className }) => {
  const icon = type === 'add'
    ? faPlus
    : type === 'update'
      ? faPenToSquare
      : faXmark;

  const label = `${type} player`
  const buttonClassNames = classnames('icon-button', className, {
      'icon-button--add': type === 'add',
      'icon-button--update': type === 'update'
    });

  return (
    <button className={buttonClassNames} onClick={onClick} aria-label={label}>
      <FontAwesomeIcon className="icon-button__icon"icon={icon}/>
    </button>
  )
}

IconButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default IconButton;