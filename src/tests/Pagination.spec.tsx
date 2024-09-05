import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from '../components/Pagination/Pagination';
import '@testing-library/jest-dom';

describe('Pagination', () => {
  it('does not render when totalPages is 1', () => {
    render(<Pagination page={1} totalPages={1} setPage={() => {}} />);
    const paginationElement = screen.queryByText(/Страница/i);
    expect(paginationElement).not.toBeInTheDocument();
  });
  it('renders correctly and disables/enables buttons based on the current page', () => {
    const mockSetPage = jest.fn();
    render(<Pagination page={1} totalPages={5} setPage={mockSetPage} />);

    const backButton = screen.getByRole('button', { name: 'Назад' });
    const nextButton = screen.getByRole('button', { name: 'Вперед' });

    expect(backButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    expect(mockSetPage).toHaveBeenCalledWith(2);
  });
  it('enables both buttons when not on the first or last page', () => {
    const mockSetPage = jest.fn();
    render(<Pagination page={2} totalPages={5} setPage={mockSetPage} />);

    const backButton = screen.getByRole('button', { name: 'Назад' });
    const nextButton = screen.getByRole('button', { name: 'Вперед' });

    expect(backButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(backButton);
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it("disables the 'Вперед' button on the last page", () => {
    const mockSetPage = jest.fn();
    render(<Pagination page={5} totalPages={5} setPage={mockSetPage} />);

    const nextButton = screen.getByRole('button', { name: 'Вперед' });

    expect(nextButton).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Назад' }));
    expect(mockSetPage).toHaveBeenCalledWith(4);
  });
});
