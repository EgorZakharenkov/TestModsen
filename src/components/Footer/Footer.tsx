import './style.scss';

import { FC } from 'react';
import { Link } from 'react-router-dom';

import modsen_logo from '@/assets/modsen.svg';

import { Logo } from '../Logo/Logo';

export const Footer: FC = () => {
  return (
    <footer className={'footer'}>
      <div className={'footer__logo'}>
        <Link to={'/'}>
          <Logo color={'#000'} />
        </Link>
      </div>
      <div className={'footer__logo'}>
        <a href="https://www.modsen-software.com/">
          <img src={modsen_logo} alt="modsen_logo" />
        </a>
      </div>
    </footer>
  );
};
