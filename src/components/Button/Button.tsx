import './style.scss';

import { FC } from 'react';

import { ButtonProps } from '../../utils/types';

export const Button: FC<ButtonProps> = ({ className, children, onClick, disabled, variant = 'default' }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={`button ${className} ${variant}`}>
      {children}
    </button>
  );
};
