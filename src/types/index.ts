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
