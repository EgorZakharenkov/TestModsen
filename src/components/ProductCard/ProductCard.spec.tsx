import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe("ProductCard", () => {
  it("renders correctly with given props", () => {
    render(
      <MemoryRouter>
        <ProductCard
          id={1}
          image_id="image-id"
          artist_title="Artist Title"
          title="Product Title"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Product Title")).toBeInTheDocument();
    expect(screen.getByText("Artist Title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Artist Title");
  });
});
