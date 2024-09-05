import { DataType, ResponseType } from '../types';
import * as z from 'zod';
import { FavoritesManager } from '../sessionStorage';

export const filteredData = (data: ResponseType | null, filter: string) => {
  if (!data?.data) return [];
  return data.data.slice().sort((a, b) => {
    const aTitle = a.title ?? '';
    const bTitle = b.title ?? '';
    const aArtist = a.artist_title ?? '';
    const bArtist = b.artist_title ?? '';

    if (filter === 'title') {
      return aTitle.localeCompare(bTitle);
    } else if (filter === 'artist_title') {
      return aArtist.localeCompare(bArtist);
    }
    return 0;
  });
};

const searchSchema = z.object({
  value: z.string().min(1, 'Минимальная длина строки - 2 символа').max(12, 'Максимальная длина строки - 12 символов'),
});

export const validate = (values: { value: string }) => {
  const validation = searchSchema.safeParse(values);
  if (!validation.success) {
    return validation.error.flatten().fieldErrors;
  }
  return {};
};

export const handleSubmit = (
  isFavorite: boolean | undefined,
  setIsFavorite: (a: boolean) => void,
  id: number,
  productData: DataType
) => {
  if (isFavorite) {
    FavoritesManager.removeFavorite(id);
    setIsFavorite(!isFavorite);
  } else {
    FavoritesManager.addFavorite(productData);
    setIsFavorite(!isFavorite);
  }
};
