import { ProductProps } from './types';

export const FavoritesManager = {
  getFavorites: (): ProductProps[] => {
    const savedFavorites = sessionStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  },

  addFavorite: (product: ProductProps) => {
    const currentFavorites = FavoritesManager.getFavorites();
    const updatedFavorites = [...currentFavorites, product];
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return updatedFavorites;
  },

  removeFavorite: (id: number) => {
    const currentFavorites = FavoritesManager.getFavorites();
    const updatedFavorites = currentFavorites.filter((item) => item.id !== id);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  },

  isFavorite: (id: number | undefined): boolean => {
    const currentFavorites = FavoritesManager.getFavorites();
    return currentFavorites.some((item) => item.id === id);
  },
};
