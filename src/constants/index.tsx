import { Favorites } from '../pages/Favorites/Favorites';
import { Home } from '../pages/Home/Home';
import { Product } from '../pages/Product/Product';
import { RoutesType } from '../utils/types';

export const routes: RoutesType[] = [
  {
    path: '/',
    page: <Home />,
  },
  {
    path: '/product/:id',
    page: <Product />,
  },
  {
    path: '/Favorites',
    page: <Favorites />,
  },
];

export const ITEMS_PER_PAGE = 5;

export const FILTER_OPTIONS = [
  { value: 'title', label: 'По названию' },
  { value: 'artist_title', label: 'По артисту' },
];

export const links = [
  {
    name: 'Главная',
    path: '/',
  },
  {
    name: 'Избранное',
    path: '/Favorites',
  },
];

export const LoaderSkeletonItems = [11, 12, 13, 14, 15];
