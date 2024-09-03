import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Search } from "./Search";
import { useSearch } from "../../context/SearchContext";

jest.mock("../../context/SearchContext.tsx");

describe("Search", () => {
  const setSearchTermMock = jest.fn();

  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue({
      setSearchTerm: setSearchTermMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input field", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Поиск...");
    expect(input).toBeInTheDocument();
  });

  it("does not show an error message when input length is within the limit", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Поиск...");

    fireEvent.change(input, { target: { value: "Коротко" } });
    fireEvent.blur(input);

    expect(
      screen.queryByText("Максимальная длина строки - 12 символов"),
    ).not.toBeInTheDocument();
  });
});
