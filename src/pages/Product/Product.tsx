import { useState, useEffect, FC } from "react";
import { useParams } from "react-router-dom";

import "./style.scss";
import { useFetchData } from "../../hooks";
import { DataType, ResponseFullProductType } from "../../types";
import { ProductSkeleton } from "../../components/ProductSkeleton/ProductSkeleton";
import { Button } from "../../components/Button/Button";

export const Product: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetchData<ResponseFullProductType>(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_title,date_display,image_id,place_of_origin`,
  );

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (data?.data) {
      const savedFavorites = sessionStorage.getItem("favorites");
      const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      setIsFavorite(
        favorites.some((item: DataType) => item.id === data.data?.id),
      );
    }
  }, [data]);

  const handleFavoriteClick = () => {
    if (data?.data) {
      const savedFavorites = sessionStorage.getItem("favorites");
      const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

      const updatedFavorites = isFavorite
        ? favorites.filter((item: DataType) => item.id !== data.data?.id)
        : [...favorites, data.data];

      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    }
  };

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
              variant={"full"}
              className={isFavorite ? "active" : ""}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
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
                <strong>Место происхождения:</strong>{" "}
                {data.data.place_of_origin}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
