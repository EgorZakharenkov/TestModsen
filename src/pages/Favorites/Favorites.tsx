import { FC, useEffect, useState } from 'react';
import './style.scss';
import { DataType } from '../../types';
import { FavoriteCard } from '../../components/FavoriteCard/FavoriteCard';

export const Favorites: FC = () => {
  const [favorites, setFavorites] = useState<DataType[]>([]);

  useEffect(() => {
    const savedFavorites = sessionStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
            removeFavorite={removeFavorite}
          />
        ))}
      </div>
    </div>
  );
};
