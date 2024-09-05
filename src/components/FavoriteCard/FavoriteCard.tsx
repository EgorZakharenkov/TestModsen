import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import './style.scss';
import { FC } from 'react';

interface Props {
  id: number;
  image_id: string;
  artist_title: string;
  title: string;
  removeFavorite: (id: number) => void;
}

export const FavoriteCard: FC<Props> = ({ id, artist_title, title, image_id, removeFavorite }) => {
  return (
    <div key={id} className="favorites-item">
      <Link to={`/product/${id}`}>
        <img
          src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
          alt={artist_title}
          className="favorites-item-image"
        />
      </Link>
      <div className="favorites-item-info">
        <h2 className="favorites-item-title">{title}</h2>
        <p className="favorites-item-artist">{artist_title}</p>
        <Button onClick={() => removeFavorite(id)}>Удалить из избранного</Button>
      </div>
    </div>
  );
};
