import './style.scss';

import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '@/assets/logo.svg';

import { links } from '../../constants';
import { useMobileView } from '../../utils/hooks';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu.tsx';

export const Header: FC = () => {
  const location = useLocation();
  const isMobile = useMobileView();
  
  return (
    <header className="header">
      <div className="header-logo">
        <Link to={'/'}>
          <img src={logo} alt={'logo'} />
        </Link>
      </div>
      {isMobile ? (
        <BurgerMenu />
      ) : (
        <div className="header-links">
          {links.map((link) => (
            <Link className={`${location.pathname === link.path ? 'active' : ''}`} to={link.path} key={link.path}>
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
