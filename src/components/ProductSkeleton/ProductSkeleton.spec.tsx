import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductSkeleton } from "./ProductSkeleton";
import "@testing-library/jest-dom/extend-expect";

describe("ProductSkeleton", () => {
  it("renders the skeleton with default props", () => {
    const { container } = render(<ProductSkeleton />);

    expect(container.firstChild).toHaveClass("card-skeleton");
    expect(container.firstChild).not.toHaveClass("is-full");
  });

  it("renders the skeleton with full size when isFull is true", () => {
    const { container } = render(<ProductSkeleton isFull={true} />);

    expect(container.firstChild).toHaveClass("card-skeleton is-full");
  });

  it("renders the correct number of skeleton elements", () => {
    const { container } = render(<ProductSkeleton />);

    expect(container.querySelector(".skeleton-image")).toBeInTheDocument();
    expect(container.querySelector(".skeleton-title")).toBeInTheDocument();
    expect(container.querySelector(".skeleton-author")).toBeInTheDocument();
    expect(container.querySelector(".skeleton-button")).toBeInTheDocument();
  });
});
