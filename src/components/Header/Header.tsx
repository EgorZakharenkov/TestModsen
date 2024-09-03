import { FC } from "react";
import "./style.scss";
import logo from "@/assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useMobileView } from "../../hooks";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu.tsx";

export const Header: FC = () => {
  const location = useLocation();
  const isMobile = useMobileView();
  const links = [
    {
      name: "Главная",
      path: "/",
    },
    {
      name: "Избранное",
      path: "/Favorites",
    },
  ];

  return (
    <header className="header">
      <div className="header-logo">
        <Link to={"/"}>
          <img src={logo} alt={"logo"} />
        </Link>
      </div>
      {isMobile ? (
        <BurgerMenu />
      ) : (
        <div className="header-links">
          {links.map((link) => (
            <Link
              className={`${location.pathname === link.path ? "active" : ""}`}
              to={link.path}
              key={link.path}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
