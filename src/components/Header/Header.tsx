import React from "react";
import "./style.scss";
import logo from "@/assets/logo.svg";
import favorites from "@/assets/Favorites.svg";
export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt={"logo"} />
      </div>
      <div className="header__favorites">
        <img src={favorites} alt="favorites" />
      </div>
    </header>
  );
};
