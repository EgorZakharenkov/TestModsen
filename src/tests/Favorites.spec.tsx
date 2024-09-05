import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Favorites } from '../pages/Favorites/Favorites';

describe('Favorites component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("displays 'no favorites' message when there are no favorites", () => {
    render(<Favorites />);

    expect(screen.getByText('Избранных элементов пока нет')).toBeInTheDocument();
  });
});
