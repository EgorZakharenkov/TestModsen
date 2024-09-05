import { FC, useEffect, useState } from 'react';
import { DataType, ResponseType } from '../../utils/types';
import { ProductSkeleton } from '../../components/ProductSkeleton/ProductSkeleton';
import { useSearch } from '../../context/SearchContext';
import { Search } from '../../components/Search/Search';
import { Filter } from '../../components/Filter/Filter';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { useFetchData } from '../../utils/hooks';
import { filteredData } from '../../utils/api';
import { ITEMS_PER_PAGE } from '../../constants';
import './style.scss';

export const Home: FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<string>('');
  const { searchTerm } = useSearch();

  const { data, loading, error } = useFetchData<ResponseType>(
    `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&page=${page}&size=${ITEMS_PER_PAGE}&fields=title,artist_title,image_id,id`
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
      <div className={'container-search'}>
        <Search />
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      {data?.data && data.data.length === 0 && 'Упс... Такого нет'}
      {loading ? (
        <div className={'skeleton-items'}>
          {Array(5)
            .fill(0)
            .map((_, index: number) => (
              <ProductSkeleton key={index} />
            ))}
        </div>
      ) : (
        <div className="card-container">
          {filteredData(data, filter).map((item: DataType) => (
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
