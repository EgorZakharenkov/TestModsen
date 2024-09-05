import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Footer } from '../components/Footer/Footer';

describe('Footer', () => {
  it('renders the Modsen logo with a link to Modsen website', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const modsenLink = screen.getByRole('link', { name: /modsen_logo/i });
    expect(modsenLink).toBeInTheDocument();
    expect(modsenLink).toHaveAttribute('href', 'https://www.modsen-software.com/');
  });
});
