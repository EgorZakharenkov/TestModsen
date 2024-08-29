import React, { useState, useEffect } from "react";
import { useFetchData } from "../../hooks";
import "./style.scss";
import { Search } from "../../components/Search/Search.tsx";
import { useSearch } from "../../context/SearchContext.tsx";
import { Product } from "../../components/Product/Product.tsx";
import { Pagination } from "../../components/Pagination/Pagination.tsx";

interface Props {
  className?: string;
}

const ITEMS_PER_PAGE = 4;

export const Home: React.FC<Props> = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { searchTerm } = useSearch();

  const { data, loading, error } = useFetchData(
    `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&page=${page}&limit=${ITEMS_PER_PAGE}&fields=title,artist_title,image_id,id`,
  );
  useEffect(() => {
    if (data) {
      const totalItems = data.pagination.total;
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
    }
  }, [data]);

  if (error) return <div className="error">Ошибка загрузки данных</div>;

  return (
    <div className="home">
      <Search />
      {loading ? (
        <div className="spinner">Загрузка...</div>
      ) : (
        <div className="card-container">
          {data?.data &&
            data.data.map((item) => (
              <Product
                id={item.id}
                title={item.title}
                artist_title={item.artist_title}
                key={item.id}
                image_id={item.image_id}
              />
            ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};
