import React from "react";
import "./style.scss";
import logo from "@/assets/logo.svg";
import favorites from "@/assets/Favorites.svg";
import { Link } from "react-router-dom";
export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to={"/"}>
          <img src={logo} alt={"logo"} />
        </Link>
      </div>
      <div className="header__logo">
        <Link to={"/Favorites"}>
          <img src={favorites} alt="favorites" />
        </Link>
      </div>
    </header>
  );
};
