import './style.scss';

import { FC, useEffect, useState } from 'react';

import { FavoriteCard } from '../../components';
import { FavoritesManager } from '../../utils/sessionStorage';
import { DataType } from '../../utils/types';

export const Favorites: FC = () => {
  const [favorites, setFavorites] = useState<DataType[]>([]);

  useEffect(() => {
    setFavorites(FavoritesManager.getFavorites());
  }, []);

  const handleDelete = (id: number) => {
    FavoritesManager.removeFavorite(id);
    setFavorites(FavoritesManager.getFavorites());
  };
  if (favorites.length === 0) {
    return <div className="favorites-empty">Избранных элементов пока нет</div>;
  }

  return (
    <div className="favorites">
      <h1>Избранное</h1>
      <div className="favorites-list">
        {favorites.map((item) => (
          <FavoriteCard
            id={item.id}
            image_id={item.image_id}
            artist_title={item.artist_title}
            title={item.title}
            removeFavorite={() => handleDelete(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
