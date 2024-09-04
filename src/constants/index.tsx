import { Home } from "../pages/Home/Home.tsx";
import { Product } from "../pages/Product/Product.tsx";
import { Favorites } from "../pages/Favorites/Favorites.tsx";

export const routes = [
  {
    path: "/",
    page: <Home />,
  },
  {
    path: "/product/:id",
    page: <Product />,
  },
  {
    path: "/Favorites",
    page: <Favorites />,
  },
];
