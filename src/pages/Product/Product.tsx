import './style.scss';

import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, ProductSkeleton } from '../../components';
import { handleSubmit } from '../../utils/api';
import { useFetchData } from '../../utils/hooks';
import { FavoritesManager } from '../../utils/sessionStorage';
import { ResponseFullProductType } from '../../utils/types';

export const Product: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetchData<ResponseFullProductType>(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_title,date_display,image_id,place_of_origin`
  );

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(FavoritesManager.isFavorite(data?.data.id));
  }, [data?.data.id, id]);

  if (loading)
    return (
      <div className="loading">
        <ProductSkeleton isFull />
      </div>
    );
  if (error) return <div className="error">Ошибка загрузки данных</div>;
  if (!data) return <div className="no-data">Нет данных для отображения</div>;

  return (
    <>
      {data.data && (
        <div className="productPage">
          <div className="product-header">
            <h1 className="product-title">{data.data.title}</h1>
            <Button
              variant={'full'}
              className={isFavorite ? 'active' : ''}
              onClick={() => handleSubmit(isFavorite, setIsFavorite, data.data.id, data.data)}
            >
              {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            </Button>
          </div>
          <div className="product-content">
            {data.data.image_id && (
              <img
                src={`https://www.artic.edu/iiif/2/${data.data.image_id}/full/843,/0/default.jpg`}
                alt={data.data.title}
                className="product-image"
              />
            )}
            <div className="product-details">
              <p className="product-artist">
                <strong>Автор:</strong> {data.data.artist_title}
              </p>
              <p className="product-date">
                <strong>Дата:</strong> {data.data.date_display}
              </p>
              <p className="product-origin">
                <strong>Место происхождения:</strong> {data.data.place_of_origin}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
