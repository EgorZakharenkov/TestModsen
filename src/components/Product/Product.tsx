import React, { useEffect, useState } from "react";

interface Props {
  id: number;
  image_id: string;
  artist_title: string;
  title: string;
}

export const Product: React.FC<Props> = ({
  id,
  image_id,
  artist_title,
  title,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  useEffect(() => {
    const savedFavorites = sessionStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleFavoriteClick = (id: number) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);

    sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  return (
    <div key={id} className="card">
      <img
        src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
        alt={artist_title}
        className="card-image"
      />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-author">{artist_title}</p>
        <button
          className={`favorite-button ${favorites.includes(id) ? "active" : ""}`}
          onClick={() => handleFavoriteClick(id)}
        >
          {favorites.includes(id)
            ? "Удалить из избранного"
            : "Добавить в избранное"}
        </button>
      </div>
    </div>
  );
};
