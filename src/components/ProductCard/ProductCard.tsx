import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import './style.scss';

interface Props {
  id: number;
  image_id: string;
  artist_title: string;
  title: string;
}

export const ProductCard: FC<Props> = ({ id, image_id, artist_title, title }) => {
  const [favorites, setFavorites] = useState<Props[]>([]);

  useEffect(() => {
    const savedFavorites = sessionStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleFavoriteClick = () => {
    const savedFavorites = sessionStorage.getItem('favorites');
    const currentFavorites: Props[] = savedFavorites ? JSON.parse(savedFavorites) : [];

    const isFavorite = currentFavorites.some((item) => item.id === productData.id);

    const updatedFavorites = isFavorite
      ? currentFavorites.filter((item) => item.id !== productData.id)
      : [...currentFavorites, productData];

    setFavorites(updatedFavorites);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

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
          className={favorites.some((item) => item.id === id) ? 'active' : ''}
          onClick={() => handleFavoriteClick()}
        >
          {favorites.some((item) => item.id === id) ? 'Удалить из избранного' : 'Добавить в избранное'}
        </Button>
      </div>
    </div>
  );
};
