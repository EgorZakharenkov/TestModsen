import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FavoriteCard } from "./FavoriteCard";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe("FavoriteCard component", () => {
  const mockRemoveFavorite = jest.fn();

  const props = {
    id: 1,
    image_id: "abc123",
    artist_title: "Artist Name",
    title: "Artwork Title",
    removeFavorite: mockRemoveFavorite,
  };

  it("renders the FavoriteCard component with correct data", () => {
    render(
      <Router>
        <FavoriteCard {...props} />
      </Router>,
    );

    const image = screen.getByAltText(props.artist_title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `https://www.artic.edu/iiif/2/${props.image_id}/full/843,/0/default.jpg`,
    );

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.artist_title)).toBeInTheDocument();
    expect(screen.getByText("Удалить из избранного")).toBeInTheDocument();
  });

  it("navigates to the product page when the image is clicked", () => {
    const { container } = render(
      <Router>
        <FavoriteCard {...props} />
      </Router>,
    );

    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", `/product/${props.id}`);
  });

  it("calls removeFavorite when the button is clicked", () => {
    render(
      <Router>
        <FavoriteCard {...props} />
      </Router>,
    );

    const button = screen.getByText("Удалить из избранного");
    fireEvent.click(button);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(props.id);
  });
});
