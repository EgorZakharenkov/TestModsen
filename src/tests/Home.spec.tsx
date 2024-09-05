import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Home } from '../pages/Home/Home';
import { useSearch } from '../context/SearchContext';
import { useFetchData } from '../utils/hooks';

jest.mock('../components/Search/Search.tsx', () => ({
  Search: jest.fn(() => <div>Поиск...</div>),
}));

jest.mock('../components/Filter/Filter.tsx', () => ({
  Filter: jest.fn(({ filter, setFilter }) => (
    <div>
      <button onClick={() => setFilter('новый')}>По алфавиту</button>
      <span>Текущий фильтр: {filter}</span>
    </div>
  )),
}));

jest.mock('../components/ProductCard/ProductCard.tsx', () => ({
  ProductCard: jest.fn(({ title }) => <div>{title}</div>),
}));

jest.mock('../components/Pagination/Pagination.tsx', () => ({
  Pagination: jest.fn(({ page, totalPages, setPage }) => (
    <div>
      <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
        Назад
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
        Вперед
      </button>
    </div>
  )),
}));

jest.mock('../components/ProductSkeleton/ProductSkeleton.tsx', () => ({
  ProductSkeleton: jest.fn(() => <div>Skeleton</div>),
}));

jest.mock('../utils/hooks', () => ({
  useFetchData: jest.fn(),
}));

jest.mock('../context/SearchContext.tsx', () => ({
  useSearch: jest.fn(),
}));

describe('Home component', () => {
  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue({ searchTerm: '' });
  });

  it('renders the Home component with search, filter, and pagination', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: { data: [], pagination: { total: 40 } },
      loading: false,
      error: null,
    });

    render(<Home />);
    expect(screen.getByText('Поиск...')).toBeInTheDocument();
    expect(screen.getByText('По алфавиту')).toBeInTheDocument();
    expect(screen.getByText('Вперед')).toBeInTheDocument();
  });

  it('displays product cards when data is fetched', async () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: {
        data: [
          {
            id: 1,
            title: 'Artwork 1',
            artist_title: 'Artist 1',
            image_id: 'image1',
          },
          {
            id: 2,
            title: 'Artwork 2',
            artist_title: 'Artist 2',
            image_id: 'image2',
          },
        ],
        pagination: { total: 10 },
      },
      loading: false,
      error: null,
    });

    render(<Home />);

    expect(await screen.findByText('Artwork 1')).toBeInTheDocument();
    expect(await screen.findByText('Artwork 2')).toBeInTheDocument();
  });

  it('shows loading skeletons while data is loading', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<Home />);

    expect(screen.getAllByText('Skeleton')).toHaveLength(5);
  });

  it('displays an error message when there is an error', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error occurred',
    });

    render(<Home />);

    expect(screen.getByText('Ошибка загрузки данных')).toBeInTheDocument();
  });

  it('updates filter and displays applied filter', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: { data: [], pagination: { total: 0 } },
      loading: false,
      error: null,
    });

    render(<Home />);

    fireEvent.click(screen.getByText('По алфавиту'));

    expect(screen.getByText('Текущий фильтр: новый')).toBeInTheDocument();
  });
});
