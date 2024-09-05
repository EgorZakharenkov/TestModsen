import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useMenuToggle } from '../utils/hooks';
import { BurgerMenu } from '../components/BurgerMenu/BurgerMenu';

jest.mock('../utils/hooks', () => ({
  useMenuToggle: jest.fn(),
}));

describe('BurgerMenu', () => {
  const mockToggleMenu = jest.fn();
  const mockCloseMenu = jest.fn();

  beforeEach(() => {
    (useMenuToggle as jest.Mock).mockReturnValue({
      isOpen: false,
      toggleMenu: mockToggleMenu,
      closeMenu: mockCloseMenu,
    });
  });

  test('should open the menu when burger button is clicked', () => {
    (useMenuToggle as jest.Mock).mockReturnValue({
      isOpen: true,
      toggleMenu: mockToggleMenu,
      closeMenu: mockCloseMenu,
    });

    render(
      <Router>
        <BurgerMenu />
      </Router>
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Избранное')).toBeInTheDocument();
  });

  test('should call toggleMenu function when burger button is clicked', () => {
    render(
      <Router>
        <BurgerMenu />
      </Router>
    );

    const burgerButton = screen.getByRole('button');
    fireEvent.click(burgerButton);

    expect(mockToggleMenu).toHaveBeenCalled();
  });

  test('should close the menu when clicking outside', () => {
    (useMenuToggle as jest.Mock).mockReturnValue({
      isOpen: true,
      toggleMenu: mockToggleMenu,
      closeMenu: mockCloseMenu,
    });

    render(
      <Router>
        <BurgerMenu />
      </Router>
    );

    fireEvent.click(document.body);

    expect(mockCloseMenu).toHaveBeenCalled();
  });
});
