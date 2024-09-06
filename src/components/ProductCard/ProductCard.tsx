import './style.scss';

import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { handleSubmit } from '../../utils/api';
import { FavoritesManager } from '../../utils/sessionStorage';
import { ProductProps } from '../../utils/types';
import { Button } from '../index';

export const ProductCard: FC<ProductProps> = ({ id, image_id, artist_title, title }) => {
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>();

  useEffect(() => {
    setIsFavorite(FavoritesManager.isFavorite(id));
  }, [id]);

  const productData = { id, image_id, artist_title, title };

  return (
    <div key={id} className="card">
      <Link to={`/product/${id}`}>
        <img
          src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
          alt={artist_title}
          className="card-image"
        />
      </Link>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-author">{artist_title}</p>
        <Button
          className={isFavorite ? 'active' : ''}
          onClick={() => handleSubmit(isFavorite, setIsFavorite, id, productData)}
        >
          {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        </Button>
      </div>
    </div>
  );
};
