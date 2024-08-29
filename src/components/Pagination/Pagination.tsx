import React from "react";

interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ page, setPage, totalPages }) => {
  return (
    <div className="pagination">
      <button
        className="pagination-button"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Назад
      </button>
      <span>
        Страница {page} из {totalPages}
      </span>
      <button
        className="pagination-button"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Вперед
      </button>
    </div>
  );
};
