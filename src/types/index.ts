export type DataType = {
  title: string;
  artist_title: string;
  image_id: string;
  id: number;
};
export type ResponseType = {
  data: DataType[] | null;
  pagination: {
    current_page: number;
    limit: number;
    total: number;
  };
};
