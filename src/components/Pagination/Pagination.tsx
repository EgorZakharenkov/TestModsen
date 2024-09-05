import { Button } from '../Button/Button';
import { FC } from 'react';
import './style.scss';

interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const Pagination: FC<Props> = ({ page, setPage, totalPages }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <Button children={'Назад'} disabled={page === 1} onClick={() => setPage(page - 1)} />
      <span>
        Страница {page} из {totalPages}
      </span>
      <Button onClick={() => setPage(page + 1)} disabled={page === totalPages} children={'Вперед'} />
    </div>
  );
};
