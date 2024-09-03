import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataType } from "../../types";
import "./style.scss";
import { Button } from "../../components/Button/Button.tsx";

export const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<DataType[]>([]);

  useEffect(() => {
    const savedFavorites = sessionStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return <div className="favorites-empty">Избранных элементов пока нет</div>;
  }

  return (
    <div className="favorites">
      <h1>Избранное</h1>
      <div className="favorites-list">
        {favorites.map((item) => (
          <div key={item.id} className="favorites-item">
            <Link to={`/product/${item.id}`}>
              <img
                src={`https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}
                alt={item.artist_title}
                className="favorites-item-image"
              />
            </Link>
            <div className="favorites-item-info">
              <h2 className="favorites-item-title">{item.title}</h2>
              <p className="favorites-item-artist">{item.artist_title}</p>
              <Button onClick={() => removeFavorite(item.id)}>
                Удалить из избранного
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
