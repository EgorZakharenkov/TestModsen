import React from "react";
import modsen_logo from "@/assets/modsen.svg";
import "./style.scss";
import { Logo } from "../Logo/Logo.tsx";
export const Footer: React.FC = () => {
  return (
    <footer className={"footer"}>
      <div className={"footer__logo"}>
        <Logo color={"#000"} />
      </div>
      <div className={"footer__logo"}>
        <img src={modsen_logo} alt="modsen_logo" />
      </div>
    </footer>
  );
};
