import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Product } from './Product';
import { useFetchData } from '../../hooks';
import { useParams } from 'react-router-dom';

jest.mock('../../hooks', () => ({
  useFetchData: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../components/ProductSkeleton/ProductSkeleton.tsx', () => ({
  ProductSkeleton: jest.fn(() => <div>Product Skeleton</div>),
}));

jest.mock('../../components/Button/Button.tsx', () => ({
  Button: jest.fn(({ onClick, children, className }) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )),
}));

describe('Product component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state with ProductSkeleton', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(<Product />);

    expect(screen.getByText('Product Skeleton')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error occurred',
    });
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(<Product />);

    expect(screen.getByText('Ошибка загрузки данных')).toBeInTheDocument();
  });

  it('displays no data message when no data is returned', () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(<Product />);

    expect(screen.getByText('Нет данных для отображения')).toBeInTheDocument();
  });
});
