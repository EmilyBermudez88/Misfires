import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

interface IconButtonProps {
  type: 'add' | 'remove' | 'update' | 'clear';
  onClick: () => void;
  className?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ type, onClick, className }, ref) => {
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
    <button ref={ref} className={buttonClassNames} onClick={onClick} aria-label={label}>
      <FontAwesomeIcon className="icon-button__icon"icon={icon}/>
    </button>
  )
});

export default IconButton;