import { ReactNode } from 'react';

export type DataType = {
  title: string;
  artist_title: string;
  image_id: string;
  id: number;
};
export type DataFullType = {
  id: number;
  title: string;
  artist_title: string;
  date_display: string;
  image_id: string;
  place_of_origin: string;
};
export type ResponseFullProductType = {
  data: DataFullType;
};
export type ResponseType = {
  data: DataType[] | null;
  pagination: {
    current_page: number;
    limit: number;
    total: number;
  };
};

export type RoutesType = {
  path: string;
  page: ReactNode;
};

export type ButtonProps = {
  className?: string;
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'full';
};

export type FavoriteCardProps = {
  id: number;
  image_id: string;
  artist_title: string;
  title: string;
  removeFavorite: (id: number) => void;
};

export type FilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

export type LogoProps = {
  color?: string;
};

export type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export type ProductProps = {
  id: number;
  image_id: string;
  artist_title: string;
  title: string;
};
export type SkeletonProps = {
  isFull?: boolean;
};
