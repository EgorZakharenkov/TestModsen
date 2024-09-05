import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { useMenuToggle } from '../../utils/hooks';

export const BurgerMenu: FC = () => {
  const { isOpen, toggleMenu, closeMenu } = useMenuToggle();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.menu') && !target.closest('.burger-button')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [closeMenu]);

  return (
    <div className="burger-menu">
      <button className="burger-button" onClick={toggleMenu}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
      {isOpen && (
        <div className="menu">
          <ul>
            <li>
              <Link to={'/'}>Главная</Link>
            </li>
            <li>
              <Link to={'/Favorites'}>Избранное</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
