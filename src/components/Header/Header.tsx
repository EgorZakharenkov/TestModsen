import React, { useState } from "react";
import "./style.scss";
import logo from "@/assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useMobileView } from "../../hooks";

export const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useMobileView();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <>
          <div
            className={`burger-menu ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="burger-bar"></div>
            <div className="burger-bar"></div>
            <div className="burger-bar"></div>
          </div>
          <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
            {links.map((link) => (
              <Link
                className={`${location.pathname === link.path ? "active" : ""}`}
                to={link.path}
                key={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </>
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
