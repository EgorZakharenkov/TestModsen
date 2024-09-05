import { useState, useEffect, FC } from 'react';
import './style.scss';
import { ResponseType, DataType } from '../../types';
import { ProductSkeleton } from '../../components/ProductSkeleton/ProductSkeleton';
import { useSearch } from '../../context/SearchContext';
import { Search } from '../../components/Search/Search';
import { Filter } from '../../components/Filter/Filter';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { useFetchData } from '../../hooks';

const ITEMS_PER_PAGE = 5;

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

  const filteredData = () => {
    if (!data?.data) return [];
    return data.data.slice().sort((a, b) => {
      const aTitle = a.title ?? '';
      const bTitle = b.title ?? '';
      const aArtist = a.artist_title ?? '';
      const bArtist = b.artist_title ?? '';

      if (filter === 'title') {
        return aTitle.localeCompare(bTitle);
      } else if (filter === 'artist_title') {
        return aArtist.localeCompare(bArtist);
      }
      return 0;
    });
  };

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
          {filteredData().map((item: DataType) => (
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
