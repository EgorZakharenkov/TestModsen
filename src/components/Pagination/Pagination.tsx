import './style.scss';

import { FC } from 'react';

import { PaginationProps } from '../../utils/types';
import { Button } from '../index';

export const Pagination: FC<PaginationProps> = ({ page, setPage, totalPages }) => {
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
