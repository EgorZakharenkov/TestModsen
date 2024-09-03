import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useMenuToggle } from "../../hooks";
import { BurgerMenu } from "./BurgerMenu";
import "@testing-library/jest-dom";

jest.mock("../../hooks", () => ({
  useMenuToggle: jest.fn(),
}));

describe("BurgerMenu", () => {
  const mockToggleMenu = jest.fn();
  const mockCloseMenu = jest.fn();

  beforeEach(() => {
    (useMenuToggle as jest.Mock).mockReturnValue({
      isOpen: false,
      toggleMenu: mockToggleMenu,
      closeMenu: mockCloseMenu,
    });
  });

  test("should open the menu when burger button is clicked", () => {
    (useMenuToggle as jest.Mock).mockReturnValue({
      isOpen: true,
      toggleMenu: mockToggleMenu,
      closeMenu: mockCloseMenu,
    });

    render(
      <Router>
        <BurgerMenu />
      </Router>,
    );

    expect(screen.getByText("Главная")).toBeInTheDocument();
    expect(screen.getByText("Избранное")).toBeInTheDocument();
  });

  test("should call toggleMenu function when burger button is clicked", () => {
    render(
      <Router>
        <BurgerMenu />
      </Router>,
    );

    const burgerButton = screen.getByRole("button");
    fireEvent.click(burgerButton);

    expect(mockToggleMenu).toHaveBeenCalled();
  });

  test("should close the menu when clicking outside", () => {
    (useMenuToggle as jest.Mock).mockReturnValue({
      isOpen: true,
      toggleMenu: mockToggleMenu,
      closeMenu: mockCloseMenu,
    });

    render(
      <Router>
        <BurgerMenu />
      </Router>,
    );

    fireEvent.click(document.body);

    expect(mockCloseMenu).toHaveBeenCalled();
  });
});
