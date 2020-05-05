import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import NavLinks from "./NavLinks";

const Header = props => {
  return (
    <header className="main-header">
      <div className="main-header__menu-btn">
        <div />
        <div />
        <div />
      </div>
      <h1 className="main-header__title">
        <Link to="/" exact>Din Dins</Link>
      </h1>
      <nav className="main_header__nav-links">
        <NavLinks />
      </nav>
    </header>
  );
};

export default Header;
