import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Header", () => {
  it("renders the logo with a link to the homepage", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const logoLink = screen.getByRole("link", { name: /logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders the navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole("link", { name: "Главная" });
    const favoritesLink = screen.getByRole("link", { name: "Избранное" });

    expect(homeLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });
});
