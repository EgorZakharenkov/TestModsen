import React from "react";
import modsen_logo from "@/assets/modsen.svg";
import "./style.scss";
import { Logo } from "../Logo/Logo.tsx";
import { Link } from "react-router-dom";
export const Footer: React.FC = () => {
  return (
    <footer className={"footer"}>
      <div className={"footer__logo"}>
        <Link to={"/"}>
          <Logo color={"#000"} />
        </Link>
      </div>
      <div className={"footer__logo"}>
        <a href="https://www.modsen-software.com/">
          <img src={modsen_logo} alt="modsen_logo" />
        </a>
      </div>
    </footer>
  );
};
