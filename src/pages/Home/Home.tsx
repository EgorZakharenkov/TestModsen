import React, { useState, useEffect } from "react";
import { useFetchData } from "../../hooks";
import "./style.scss";
import { Search } from "../../components/Search/Search.tsx";
import { useSearch } from "../../context/SearchContext.tsx";
import { ProductCard } from "../../components/ProductCard/ProductCard.tsx";
import { Pagination } from "../../components/Pagination/Pagination.tsx";
import { Filter } from "../../components/Filter/Filter.tsx";
import { ResponseType } from "../../types";
import { ProductSkeleton } from "../../components/ProductSkeleton/ProductSkeleton.tsx";

interface Props {
  className?: string;
}

const ITEMS_PER_PAGE = 5;

export const Home: React.FC<Props> = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<string>("");
  const { searchTerm } = useSearch();

  const { data, loading, error } = useFetchData<ResponseType>(
    `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&page=${page}&size=${ITEMS_PER_PAGE}&fields=title,artist_title,image_id,id`,
  );
  useEffect(() => {
    if (data) {
      const totalItems = data.pagination ? data.pagination.total : 0;
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
    }
  }, [data]);

  if (error) return <div className="error">Ошибка загрузки данных</div>;
  return (
    <div className="home">
      <div className={"container-search"}>
        <Search />
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      {data?.data && data.data.length === 0 && "Упс... Такого нет"}
      {loading ? (
        <div className={"skeleton-items"}>
          {Array(5)
            .fill(0)
            .map((_, index: number) => (
              <ProductSkeleton key={index} />
            ))}
        </div>
      ) : (
        <div className="card-container">
          {data?.data &&
            data.data.map((item) => (
              <ProductCard
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
